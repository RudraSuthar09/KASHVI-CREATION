const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    if (!productId || !userId || reviewValue === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID, User ID, and review value are required!",
      });
    }

    // Check if the user already reviewed the product
    let existingReview = await ProductReview.findOne({ productId, userId });

    if (existingReview) {
      // Update existing review
      existingReview.reviewValue = reviewValue;
      existingReview.reviewMessage = reviewMessage;
      await existingReview.save();
    } else {
      // Create a new review
      existingReview = new ProductReview({
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
      });
      await existingReview.save();
    }

    // Fetch updated reviews list and sort by most recent
    const reviews = await ProductReview.find({ productId }).sort({ createdAt: -1 });

    // Calculate average rating
    const totalReviews = reviews.length;
    const averageReview =
      totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviews : 0;

    // Update product's average review
    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(200).json({
      success: true,
      message: existingReview.isNew ? "Review added successfully!" : "Review updated successfully!",
      review: existingReview,
      reviews, // Send updated reviews list
      averageReview,
    });
  } catch (e) {
    console.error("Error adding/updating review:", e);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Fetch reviews sorted by most recent
    const reviews = await ProductReview.find({ productId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.error("Error fetching reviews:", e);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getTopReviews = async (req, res) => {
  try {
    console.log("Fetching 5-star reviews...");

    const topReviews = await ProductReview.find({ reviewValue: 5 }) // ✅ Filter 5-star reviews
      .sort({ createdAt: -1 }) // ✅ Show newest reviews first
      .limit(10); // ✅ Limit to 10 reviews

    console.log("5-Star Reviews Found:", topReviews);

    res.status(200).json({ success: true, data: topReviews });
  } catch (error) {
    console.error("Error fetching 5-star reviews:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};


module.exports = { addProductReview, getProductReviews, getTopReviews };

