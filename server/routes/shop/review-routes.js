const express = require("express");

const {
  addProductReview,
  getProductReviews,
  getTopReviews
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

// ✅ Route to add a new product review
router.post("/add", addProductReview);

// ✅ Route to fetch reviews for a specific product
router.get("/product/:productId", getProductReviews);

// ✅ Route to fetch general top 5-star reviews (not product-specific)
router.get("/top-reviews", getTopReviews);

module.exports = router;
