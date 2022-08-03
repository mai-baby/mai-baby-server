// models/Product.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    short_desc: { type: String, required: true },
    long_desc: { type: String },
    price: { type: Number, required: true },
    // merchant_name: { type: Schema.Types.ObjectId, ref: "Merchant" },
    merchant_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
