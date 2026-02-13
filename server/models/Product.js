const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    media : [String],
    designNumber: String,
    title: String,
    description: String,
    category: String,
    occasion: String,
    fabric: String,
    color: String,
    totalStock: { type: Number, min: 0 }, // Prevent negative stock
    averageReview: { type: Number, default: 0 }, // Default value to prevent undefined issues
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
