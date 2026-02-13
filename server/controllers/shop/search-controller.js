const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    // Validate the keyword input
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Escape special characters for regex
    const regEx = new RegExp(keyword.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&"), "i");

    // Build search query
    const createSearchQuery = {
      $or: [
        { designNumber: regEx },
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { occasion: regEx },
        { fabric: regEx },
        { color: regEx },
      ],
    };

    console.log('Searching for keyword:', keyword);
    console.log('Search query:', createSearchQuery);

    // Search the products in the database
    let searchResults;
    try {
      searchResults = await Product.find(createSearchQuery);
    } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while searching products",
      });
    }

    // If no results are found
    if (searchResults.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for the provided keyword",
      });
    }

    // Return search results
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching products",
    });
  }
};

module.exports = { searchProducts };
