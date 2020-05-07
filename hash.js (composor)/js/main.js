document.addEventListener("DOMContentLoaded", () => {
  //-------- Crypto Transfer----------//
  //   function CryptoTransfer() {
  document.getElementById("popup-button").addEventListener("click", (e) => {
    e.preventDefault();
    let data = {
      time: "1",
      memo: "My First Hedera Transaction",
      contentid: "test1",
      redirect: '{"nonPayingAccount": "/nomicropaymentreceived.html"}',
      recipientlist: '[{"tinybars": "10000", "to":"0.0.1107"}]',
      type: "article",
    };

    window.hash.triggerCryptoTransfer(data, (err, res) => {
      console.log("ERROR:::", err);
      console.log("SUCCESS:::", res);
    });
  });
  //   }
  //   CryptoTransfer();
  //-------- Crypto Transfer----------//
  document.getElementById("contract-button").addEventListener("click", (e) => {
    e.preventDefault();

    let data = {
      contractid: "0.0.15372",
      memo: "My First Hedera Transaction",
      params: "[7]",
      amount: 0,
      abi: `[{"constant":false,"inputs":[{"name":"_status","type":"uint256"}],"name":"setNewStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]`,
    };

    window.hash
      .triggerSmartContract(data)
      .then((res) => console.log("SUCESS:::", res))
      .catch((err) => console.log("ERROR:::", err));
  });
});

// addEventListener("load", (e) => {
//   e.preventDefault();
// });
