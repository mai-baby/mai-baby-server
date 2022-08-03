// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    user_name: { type: String, required: true },
    cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    address: {
      fullname: String,
      street: String,
      postal: String,
      city: String,
      state: String,
      country: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
