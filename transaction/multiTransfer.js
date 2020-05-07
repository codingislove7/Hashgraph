// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const { Client, CryptoTransferTransaction, Hbar } = require("@hashgraph/sdk");

async function multiTransfer() {
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

  // Multi Transfer
  const transactionId = await new CryptoTransferTransaction()
    // define total amount of hbar to send
    .addSender(operatorAccount, new Hbar(2))
    // add recipient, and amount of hbar
    .addRecipient("0.0.3", new Hbar(1))
    // add recipient, and amount of hbar
    .addRecipient("0.0.17210", new Hbar(1))
    .execute(client);

  const receipt = await transactionId.getRecord(client);
  console.log("receipt", `${JSON.stringify(receipt)}\n`);
}

multiTransfer();
