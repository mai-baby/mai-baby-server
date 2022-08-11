const router = require("express").Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");

// STRIPE processing payment
// ADD AUTHENTICATION
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const express = require("express");
const app = express();
app.use(express.static("public"));

router.post("/create-checkout-session", (req, res, next) => {
  //   const lineItems = req.body;
  console.log(req.body);
  stripe.checkout.sessions
    .create({
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "MJ Jersey",
            },
            unit_amount: 20000, // price, how much to charge
            // adjustable_quantity: enabled,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Kobe AD Shoes",
            },
            unit_amount: 18000, // price, how much to charge
            // adjustable_quantity: enabled,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: `${process.env.ORIGIN}/payment?success=true`,
      cancel_url: `${process.env.ORIGIN}/payment?canceled=true`,
    })
    .then((session) => {
      res.redirect(303, session.url);
      //   res.json({ url: session.url });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
