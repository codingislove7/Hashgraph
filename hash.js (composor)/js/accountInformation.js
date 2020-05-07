const account = document.querySelector("#account");
const balance = document.querySelector("#balance");
const network = document.querySelector("#network");
function separate(Number) {
  Number += "";
  Number = Number.replace(",", "");
  x = Number.split(".");
  y = x[0];
  z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
}

function accountInformation() {
  addEventListener("load", (e) => {
    e.preventDefault();

    window.hash
      .triggerCheckBalance()
      .then((res) => {
        (balance.innerHTML = separate(res.balance) + " tinybars"),
          (account.innerHTML = res.currentAccount),
          (network.innerHTML = res.currentNetwork),
          console.log("SUCCESS:::", res);
      })
      .catch((err) => console.log("ERROR:::", err));
  });
}

accountInformation();
