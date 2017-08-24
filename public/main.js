var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_xccDXirNQNMdCwM6kRdzqDnr",
  locale: "auto"
});

var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "Skimmer Scooper",
    amount: 39900,
    description: "The Best Pool Cleaner on the Planet!",
    billingAddress: true,
    shippingAddress: true,
    token: handleToken
  });
});

function handleToken(token) {
  fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(token)
  })
  .then(output => {
    if (output.status === "succeeded")
      document.getElementById("shop").innerHTML = "<p>Purhcase complete!</p>";
  })
}