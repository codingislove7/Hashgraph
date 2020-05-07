// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const { Client, CryptoTransferTransaction } = require("@hashgraph/sdk");

async function transferCrypto() {
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

  // transfer
  const receipt = await //TransferTransaction
  (
    await new CryptoTransferTransaction()
      // sender account and amount to send
      .addSender(operatorAccount, 1)
      // reciver account and amount to receive
      .addRecipient("0.0.3", 1)
      //Memo
      .setTransactionMemo("sdk example")
      .execute(client)
  ).getReceipt(client);

  console.log(receipt);
}

transferCrypto();
