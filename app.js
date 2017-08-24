const express = require("express");
const stripe = require("stripe")("sk_test_vAL5prlCfC16QTrEGIAeEtp9");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/charge", (req, res) => {
    let amount = 39900;
    
    stripe.customers.create({
      email: req.body.email,
      card: req.body.id
    })
    // stripe.orders.create({
    //     email: req.body.email,
    //     items: [
    //         type: 'sku',
    //         parent: ''
    //     ]
    // })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      }))
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });
  });
  
app.listen(8100);