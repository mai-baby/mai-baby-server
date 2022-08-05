const router = require("express").Router();

const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Order = require("../models/Order.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

//READ list of orders
router.get("/orders", (req, res, next) => {
  Order.find()
    .populate("products")
    .then((allOrders) => {
      res.json(allOrders);
    })
    .catch((err) => res.json(err));
});

//CREATE new Order
// ADD AUTHENTICATION
router.post("/checkout", (req, res, next) => {
  const {
    products,
    totalPrice,
    status,
    address: { fullname, street, postal, city, state, country },
  } = req.body;

  Order.create({
    products,
    totalPrice,
    status,
    address: { fullname, street, postal, city, state, country },
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//READ Order details
router.get("/checkout/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  //validate orderId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findById(orderId)
    .then((order) => res.json(order))
    .catch((error) => res.json(error));
});

//UPDATE Order
// ADD AUTHENTICATION
router.put("/checkout/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndUpdate(orderId, req.body, { returnDocument: "after" })
    .then((updatedOrder) => res.json(updatedOrder))
    .catch((error) => res.json(error));
});

//DELETE Order
// ADD AUTHENTICATION
router.delete("/checkout/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndRemove(orderId)
    // .then((deteletedOrder) => {
    //   return User.cart.deleteMany({
    //     _id: { $in: deteletedOrder.cart }, ???
    //   });
    // })
    .then(() =>
      res.json({
        message: `Order with id ${orderId} & all associated shopping carts were removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
