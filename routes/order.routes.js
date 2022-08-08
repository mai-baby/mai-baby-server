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
    customer,
    products,
    totalPrice,
    status,
    address: { fullname, street, postal, city, state, country },
  } = req.body;

  Order.create({
    customer,
    products,
    totalPrice,
    status,
    address: { fullname, street, postal, city, state, country },
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//READ Order details
router.get("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  //validate orderId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findById(orderId)
    .populate("products")
    .then((order) => res.json(order))
    .catch((error) => res.json(error));
});

//UPDATE Order
// ADD AUTHENTICATION
router.put("/orders/edit/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndUpdate(orderId, req.body, { returnDocument: "after" })
    .then((updatedOrder) => res.json(updatedOrder))
    .catch((error) => res.json(error));
});

//DELETE Order Item
// ADD AUTHENTICATION
router.put("/orders/:orderId/:itemId", (req, res, next) => {
  const { orderId, itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.updateOne(
    { cn: itemId },
    {
      $pull: {
        products: itemId,
      },
    }
  )
    .then(() =>
      res.json({
        message: `Item with id ${itemId} was removed successfully from the order ${orderId}.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

//DELETE Order
// ADD AUTHENTICATION
router.delete("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndRemove(orderId)
    .then(() =>
      res.json({
        message: `The order with the id ${orderId} was removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
