// models/Order.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    // Don't store quantity in the first run
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    totalPrice: Number,
    status: String,
    address: {
      fullname: { type: String, required: true },
      street: { type: String, required: true },
      postal: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
