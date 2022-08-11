// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: [true, "Email address already exists."],
      lowercase: [true, "Email address must be in lowercase letters."],
      trim: [true, "No spaces allowed."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [8, "Password must at least be 8 characters long."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username already exists."],
      lowercase: [true, "Username must be in lowercase letters."],
      trim: [true, "No spaces allowed."],
    },
    // basket: [{ type: Schema.Types.ObjectId, ref: "Product" }], leave it for v2, store in React for now, maybe store quantity here
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
