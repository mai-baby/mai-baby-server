const router = require("express").Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");

// STRIPE processing payment
// ADD AUTHENTICATION
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const express = require("express");
const app = express();
app.use(express.static("public"));

router.post("/create-checkout-session", (req, res, next) => {
  stripe.checkout.sessions
    .create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1LV9XpD77hNzjERWOmai7bKl",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://7143-80-187-111-219.ngrok.io/payment-confirmation?success=true`,
      cancel_url: `https://7143-80-187-111-219.ngrok.io/payment-confirmation?canceled=true`,
    })
    .then((session) => {
      res.redirect(303, session.url);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/payment-confirmation", (req, res, next) => {
  console.log("payment confirmation received....");
  console.log(req.query);
});

module.exports = router;
