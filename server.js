class Customer {
    constructor (token) {
        this.token = token;
    }
    charge() {
        var stripe = require("stripe")("sk_test_vAL5prlCfC16QTrEGIAeEtp9");
        var charge = stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "Test charge",
            source: token,
          }, function(err, charge) {
            // asynchronously called
          });
          console.log("You've been charged!");
    }
}

module.exports = Customer;