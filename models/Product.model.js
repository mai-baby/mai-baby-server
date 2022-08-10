// models/Product.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title required."],
      maxLength: [40, "Title can't be longer than 40 characters!"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short Description required."],
      maxLength: [60, "Short Description can't be longer than 60 characters!"],
    },
    longDescription: {
      type: String,
      maxLength: [200, "Long Description can't be longer than 200 characters!"],
    },
    price: {
      type: Number,
      required: [true, "Price required."],
      min: [1, "Min. price must be over 0€."],
    },
    brand: {
      type: String,
      maxLength: [20, "Brand name can't be longer than 20 characters!"],
      default: "Whitelabel",
    },
    imageURL: {
      type: String,
      required: [true, "Image required."],
      default:
        "http://sc04.alicdn.com/kf/H6c90d253386a4d08a0f4b96b462b6cefh.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
