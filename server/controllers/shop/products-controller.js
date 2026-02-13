const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    // Destructure query parameters with capital letters (matching frontend)
    const { Category = [], Occasion = [], Fabric = [], Color = [], sortBy = "title-atoz" } = req.query;

    // Prepare the filters
    let filters = {};

    // Convert and filter by Category
    if (Category.length) {
      filters.category = { $in: Category.split(",").map(c => c.toLowerCase()) };  // Convert to lowercase
    }

    // Convert and filter by Occasion
    if (Occasion.length) {
      filters.occasion = { $in: Occasion.split(",").map(o => o.toLowerCase()) };  // Convert to lowercase
    }

    // Convert and filter by Fabric
    if (Fabric.length) {
      filters.fabric = { $in: Fabric.split(",").map(f => f.toLowerCase()) };  // Convert to lowercase
    }

    // Convert and filter by Color
    if (Color.length) {
      filters.color = { $in: Color.split(",").map(c => c.toLowerCase()) };  // Convert to lowercase
    }

    //console.log("FiltersS applied:", filters);

    // Sort logic based on `sortBy`
    let sort = {};

    switch (sortBy) {
      case "designnumber-1to10":
        sort.designNumber = 1;
        break;
      case "designnumber-10to1":
        sort.designNumber = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.title = 1;
        break;
    }

    // Fetch products based on the filters and sort criteria
    const products = await Product.find(filters).sort(sort);

    // Return the products in the response
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);  // Log the error for better debugging
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);  // Log the error for better debugging
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
