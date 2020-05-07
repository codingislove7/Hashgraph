function isConnected() {
  addEventListener("load", (e) => {
    e.preventDefault();
    if (window.hash) {
      console.log("+ + + Connected + + +");
    } else {
      console.log("- - - not Connected - - -");
    }
  });
}

isConnected();
