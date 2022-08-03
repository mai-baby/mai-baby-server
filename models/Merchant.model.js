// models/Merchant.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const merchantSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    merchant_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Merchant", merchantSchema);
