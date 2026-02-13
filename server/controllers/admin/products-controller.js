const { uploadMultipleMedia } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// ✅ Upload multiple images to Cloudinary
const handleMediaUpload = async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Log to check incoming files
    console.log("Files received for upload:", req.files);

    // Upload all media to Cloudinary and get URLs
    const uploadedMedia = await uploadMultipleMedia(req.files);

    // Log the uploaded media URLs
    console.log("Uploaded media URLs:", uploadedMedia);

    // Return success response with URLs of uploaded media
    return res.status(200).json({
      success: true,
      result: { urls: uploadedMedia },
    });
  } catch (error) {
    console.error("Error uploading media:", error);
    return res.status(500).json({ success: false, message: "Media upload failed" });
  }
};


// ✅ Add a new product with multiple images
const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging: Log request body
    
    const {
      media, // Now expects an array of image URLs
      designNumber,
      title,
      description,
      category,
      occasion,
      fabric,
      color,
      totalStock,
      averageReview,
    } = req.body;

    if (!media || !Array.isArray(media) || media.length === 0) {
      return res.status(400).json({ success: false, message: "At least one media is required" });
    }

    const newProduct = new Product({
      media, // 🔥 Saving multiple images
      designNumber,
      title,
      description,
      category,
      occasion,
      fabric,
      color,
      totalStock,
      averageReview,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

// ✅ Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// ✅ Edit a product by ID
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      media, // Multiple images
      designNumber,
      title,
      description,
      category,
      occasion,
      fabric,
      color,
      totalStock,
      averageReview,
    } = req.body;

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Update fields only if new values are provided
    product.media = media || product.media;
    product.designNumber = designNumber || product.designNumber;
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.occasion = occasion || product.occasion;
    product.fabric = fabric || product.fabric;
    product.color = color || product.color;
    product.totalStock = totalStock || product.totalStock;
    product.averageReview = averageReview || product.averageReview;

    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

// ✅ Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};

module.exports = { handleMediaUpload, addProduct, fetchAllProducts, editProduct, deleteProduct };
