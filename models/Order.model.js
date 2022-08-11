// models/Order.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    quantity: {
      type: Number,
      required: [true, "Quantity of this product required."],
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    totalPrice: {
      type: String,
      required: [true, "Total price of the order required."],
    },
    status: { type: String, required: [true, "Status of the order required."] },
    address: {
      fullname: {
        type: String,
        required: [true, "Please fill in your full name."],
      },
      street: { type: String, required: [true, "Please fill in your street."] },
      postal: {
        type: String,
        required: [true, "Please fill in your postal code."],
      },
      city: { type: String, required: [true, "Please fill in your city."] },
      state: { type: String, required: [true, "Please fill in your state."] },
      country: {
        type: String,
        required: [true, "Please fill in your country."],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
