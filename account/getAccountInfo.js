// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const { Client, AccountInfoQuery } = require("@hashgraph/sdk");

async function getAccountInfo() {
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

  // Get Account Info
  const info = await new AccountInfoQuery()
    .setAccountId(operatorAccount)
    .execute(client);

  console.log(`${operatorAccount} info = ${JSON.stringify(info, null, 4)}`);
}

getAccountInfo();
