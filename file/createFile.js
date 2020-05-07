// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const {
  Client,
  FileCreateTransaction,
  Ed25519PrivateKey,
  Hbar,
} = require("@hashgraph/sdk");

async function createFile() {
  // Grab account ID and private key from the .env file
  const operatorAccount = process.env.OPERATOR_ID;
    const operatorPrivateKey = Ed25519PrivateKey.fromString(process.env.OPERATOR_KEY);
    const operatorPublicKey = operatorPrivateKey.publicKey;

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

  //   FileCreateTransaction
  const transactionId = await new FileCreateTransaction()
    .setContents("Hello, Hedera's file service!")
    .addKey(operatorPublicKey) // Defines the "admin" of this file
    .setMaxTransactionFee(new Hbar(15))
    .execute(client);

  //Get receipt
  const receipt = await transactionId.getReceipt(client);
  console.log("new file id =", receipt.getFileId());
}

createFile();
