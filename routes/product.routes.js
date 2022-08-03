const router = require("express").Router();

const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Product = require("../models/Product.model");
const Merchant = require("../models/Merchant.model");

//READ list of products
router.get("/products", (req, res, next) => {
  Product.find()
    .populate("merchant_name")
    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => res.json(err));
});

//CREATE new product
// ADD AUTHENTICATION
router.post("/products/add", (req, res, next) => {
  const { title, short_desc, price } = req.body;

  Product.create({ title, short_desc, price, merchant_name: "who am i" })
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

  // Each Product document has `merchant` array holding `_id`s of Merchant documents
  // We use .populate() method to get swap the `_id`s for the actual Merchant documents
  Product.findById(productId)
    .populate("merchant_name")
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
    //   return Merchant.deleteMany({
    //     _id: { $in: deteletedProduct.merchant_name },
    //   });
    // })
    .then(() =>
      res.json({
        message: `Product with id ${productId} & all associated merchant were removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
