const router = require("express").Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const express = require("express");
const app = express();
app.use(express.static("public"));

router.post("/create-checkout-session", isAuthenticated, (req, res, next) => {
  const lineItems = req.body;
  stripe.checkout.sessions
    .create(lineItems)
    .then((session) => {
      res.json({ url: session.url });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
