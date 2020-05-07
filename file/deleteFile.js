// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const {
  Client,
  FileCreateTransaction,
  FileDeleteTransaction,
  Ed25519PublicKey,
  Hbar,
} = require("@hashgraph/sdk");

async function deleteFile() {
  // Grab account ID and private key from the .env file
  const operatorAccount = process.env.OPERATOR_ID;
  const operatorPrivateKey = process.env.OPERATOR_KEY;
  const operatorPublicKey = Ed25519PublicKey.fromString(process.env.OPERATOR_PUB_KEY);

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

  // First, we'll create a file with our operator as an admin
  const transactionId = await new FileCreateTransaction()
    .setContents("creating a file to test deletion")
    .setMaxTransactionFee(new Hbar(15))
    .addKey(operatorPublicKey)
    .execute(client);

  // The receipt will contain the FileId, or where it exists on the network
  const createFileReceipt = await transactionId.getReceipt(client);
  console.log("create file receipt", `${JSON.stringify(createFileReceipt)}\n`);

  // Then we'll delete this newly created file
  const deleteFileTransactionId = await new FileDeleteTransaction()
    .setFileId(createFileReceipt.getFileId()) // Define which file to delete
    .setMaxTransactionFee(new Hbar(1))
    .execute(client); // Presumes the client is the file's admin key

  // After deletion, the receipt should NOT contain a file ID
  const deleteFileReceipt = await deleteFileTransactionId.getReceipt(client);
  console.log(
    "deleted file receipt, won't contain a file ID",
    `${deleteFileReceipt.getFileId()}\n`
  );
}

deleteFile();
