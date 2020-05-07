// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const {
  Client,
  Ed25519PrivateKey,
  AccountCreateTransaction,
  Hbar,
} = require("@hashgraph/sdk");

async function createAccount() {
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
  console.log("private =", privateKey);
  console.log("public =", privateKey.publicKey);

  //  Create Account Transaction
  const transactionId = await new AccountCreateTransaction()
    .setKey(privateKey.publicKey)
    .setMaxTransactionFee(new Hbar(1))
    .setInitialBalance(0)
    .execute(client);

  // Get transaction Receipt
  const transactionReceipt = await transactionId.getReceipt(client);

  console.log("receipt =", transactionReceipt);

  // Get new Account Id
  const newAccountId = transactionReceipt.getAccountId();

  console.log("accountId =", newAccountId);
}

createAccount();
