// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const {
  Client,
  Ed25519PrivateKey,
  AccountCreateTransaction,
  ThresholdKey,
} = require("@hashgraph/sdk");

async function createThresholdAccount() {
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

  // Generate our key lists
  const privateKeyList = [];
  const publicKeyList = [];
  for (let i = 0; i < 4; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const privateKey = await Ed25519PrivateKey.generate();
    const publicKey = privateKey.publicKey;
    privateKeyList.push(privateKey);
    publicKeyList.push(publicKey);
    console.log(`${i}: pub key:${publicKey}`);
    console.log(`${i}: priv key:${privateKey}`);
  }

  // Create our threshold key
  const thresholdKey = new ThresholdKey(3); // Define min # of sigs
  for (const element of publicKeyList) {
    thresholdKey.add(element);
  }

  // Create a new account with this threshold key
  const accountCreateTransaction = await new AccountCreateTransaction()
    .setKey(thresholdKey)
    .setInitialBalance(0)
    .execute(client);

  const receipt = await accountCreateTransaction.getReceipt(client);

  console.log(receipt.getAccountId().toString());
}

createThresholdAccount();
