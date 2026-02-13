const asyncHandler = require("express-async-handler");
const User = require("../../models/User");
const Product = require("../../models/Product");

// ✅ Get Wishlist using userId
const getWishlist = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("wishlist");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Add to Wishlist using userId
const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "User ID and Product ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Remove from Wishlist using userId
const removeFromWishlist = asyncHandler(async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
