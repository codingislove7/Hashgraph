// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const { Client, FileContentsQuery, FileId } = require("@hashgraph/sdk");

async function getFileContents() {
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

  //File Contents
  const resp = await new FileContentsQuery()
    .setFileId(FileId.ADDRESS_BOOK)
    .execute(client);

  //Converting ArrayBuffers to strings

  console.log(resp);
}

getFileContents();
