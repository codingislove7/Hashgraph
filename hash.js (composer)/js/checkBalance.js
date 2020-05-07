function checkBalance(address = "0.0.12345") {
  addEventListener("load", (e) => {
    e.preventDefault();
    hash.triggerCheckBalance(address, (err, res) => {
      if (err) {
        console.log("Error:::", err);
      } else {
        console.log("Success:::", res);
      }
    });
  });
}
checkBalance();
