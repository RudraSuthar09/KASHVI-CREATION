const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../../controllers/shop/wishlist-controller"); 

const router = express.Router();

// ✅ Get Wishlist using userId
router.get("/wishlist/:userId", getWishlist);

// ✅ Add Product to Wishlist using userId
router.post("/add", addToWishlist);

// ✅ Remove Product from Wishlist using userId
router.delete("/remove/:userId/:productId", removeFromWishlist);

module.exports = router;
