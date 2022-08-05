// models/Product.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    imageURL: {
      type: String,
      default:
        "http://sc04.alicdn.com/kf/H6c90d253386a4d08a0f4b96b462b6cefh.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
