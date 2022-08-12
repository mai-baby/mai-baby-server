const router = require("express").Router();

const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

router.get("/products", (req, res, next) => {
  Product.find()
    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => res.json(err));
});

router.post("/products", isAuthenticated, (req, res, next) => {
  const { title, shortDescription, price, brand, imageURL } = req.body;

  Product.create({ title, shortDescription, price, brand, imageURL })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(productId)
    .then((product) => res.json(product))
    .catch((error) => res.json(error));
});

router.put("/products/:productId", isAuthenticated, (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(productId, req.body, { returnDocument: "after" })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((error) => res.json(error));
});

router.delete("/products/:productId", isAuthenticated, (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndRemove(productId)
    .then(() =>
      res.json({
        message: `Product with id ${productId} & all associated shopping carts were removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
