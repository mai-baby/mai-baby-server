const router = require("express").Router();

const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

//READ list of products
router.get("/products", (req, res, next) => {
  Product.find()
    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => res.json(err));
});

//CREATE new product
// ADD AUTHENTICATION
router.post("/products/add", (req, res, next) => {
  const { title, short_desc, price, brand } = req.body;

  Product.create({ title, short_desc, price, brand })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//READ product details
router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  //validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(productId)
    .then((product) => res.json(product))
    .catch((error) => res.json(error));
});

//UPDATE product
// ADD AUTHENTICATION
router.put("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(productId, req.body, { returnDocument: "after" })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((error) => res.json(error));
});

//DELETE Product
// ADD AUTHENTICATION
router.delete("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndRemove(productId)
    // .then((deteletedProduct) => {
    //   return User.cart.deleteMany({
    //     _id: { $in: deteletedProduct.cart }, ???
    //   });
    // })
    .then(() =>
      res.json({
        message: `Product with id ${productId} & all associated shopping carts were removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
