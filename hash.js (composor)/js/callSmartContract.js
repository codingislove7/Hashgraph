function callSmartContract() {
  addEventListener("load", (e) => {
    e.preventDefault();
    let data = {
      // string contract Id can be of account id type('0.0.1234')
      // or domain name type ('mydomain.hh')
      contractid: "0.0.15372",
      //string short message specifying the purpose or
      // message relating to the call
      memo: "My First Hedera Transaction",
      //string (optional) - string of Array
      // which contains parameters of contract function to be executed
      params: "[7]",
      //data.extensionid string (optional) - extension id of composer
      //   extensionid: "",
      //data.gasfee number cost of transaction fee(tinybars)
      //needed for call
      //   gasfee: 500,
      //data.transactionfee number cost of transaction fee(tinybars)
      //needed for call
      //   transactionfee: 500,
      // number (optional)
      //   amount: 0,
      //data.abi-null string string array of objects
      //which contains details of contract function
      abi: `[{"constant":false,"inputs":[{"name":"_status","type":"uint256"}],"name":"setNewStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]`,
    };

    window.hash
      .triggerSmartContract(data)
      .then((res) => console.log("SUCESS:::", res))
      .catch((err) => console.log("ERROR:::", err));
  });
}

callSmartContract();
