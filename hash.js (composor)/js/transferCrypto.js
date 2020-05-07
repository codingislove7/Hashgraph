function transferCrypto() {
  addEventListener("load", (e) => {
    e.preventDefault();

    let data = {
      time: "1",
      memo: "My First Hedera Transaction",
      contentid: "test1",
      redirect: '{"nonPayingAccount": "/nomicropaymentreceived.html"}',
      recipientlist: '[{"tinybars": "444", "to":"0.0.1107"}]',
      type: "article",
    };

    window.hash.triggerCryptoTransfer(data, (err, res) => {
      if (err) {
        console.log("ERROR:::", err);
      } else {
          console.log("_________________________");
          
        console.log("SUCCESS:::", res);
      }
    });
  });
}
transferCrypto();
