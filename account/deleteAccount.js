// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const {
  Client,
  Ed25519PrivateKey,
  AccountCreateTransaction,
  AccountDeleteTransaction,
  Hbar,
  TransactionId,
} = require("@hashgraph/sdk");

async function deleteAccount() {
  // Grab account ID and private key from the .env file
  const operatorPrivateKey = process.env.OPERATOR_KEY;
  const operatorAccount = process.env.OPERATOR_ID;

  // If we weren't able to grab it, we should throw a new error
  if (operatorPrivateKey == null || operatorAccount == null) {
    throw new Error(
      "environment variables OPERATOR_KEY and OPERATOR_ID must be present"
    );
  }
  // Create our connection to the Hedera network
  const client = Client.forTestnet();

  // Set your client account ID and private key
  // used to pay for transaction fees and sign transactions
  client.setOperator(operatorAccount, operatorPrivateKey);

  // Generate new privateKey
  const privateKey = await Ed25519PrivateKey.generate();
  console.log("Creating an account to delete");
  console.log(`private = ${privateKey.toString()}`);
  console.log(`public = ${privateKey.publicKey.toString()}`);

  //  Create Account Transaction
  let transactionId = await new AccountCreateTransaction()
    .setKey(privateKey.publicKey)
    .setInitialBalance(new Hbar(2))
    .execute(client);

  // Get transaction Receipt
  let transactionReceipt = await transactionId.getReceipt(client);

  // Get new Account Id
  const newAccountId = transactionReceipt.getAccountId();

  console.log(`account = ${newAccountId}`);
  console.log("Deleting created account");

  // To delete an account you **MUST** do the following:

  //  Delete Account Transaction
  transactionId = await new AccountDeleteTransaction()

    // Set which account to delete.
    .setDeleteAccountId(newAccountId)

    // Set which account to transfer the remaining balance to.
    .setTransferAccountId("0.0.3")

    // Manually set a `TransactionId` constructed from the
    // `AccountId` you are  deleting.
    .setTransactionId(new TransactionId(newAccountId))
    .build(client)

    // Sign the transaction with the same key as on the acount being deleted.
    .sign(privateKey)

    // Finally, execute the transaction with `Transaction.execute()`
    .execute(client);
  // Get transaction Receipt
  transactionReceipt = await transactionId.getReceipt(client);

  console.log(`status: ${transactionReceipt.status}`);
}

deleteAccount();
