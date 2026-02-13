const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

// Helper function to map cart items
const mapCartItems = (items) => {
  return items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId && item.productId.media && item.productId.media.length > 0 ? item.productId.media[0] : null,
    title: item.productId ? item.productId.title : "Product not found",
    designNumber: item.productId ? item.productId.designNumber : null,
    quantity: item.quantity,
  }));
};

//console.log(mapCartItems);

// Add item to the cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user or product ID",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (productIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[productIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({
      success: false,
      message: "Error while adding item to cart",
    });
  }
};

// Fetch cart items
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params; 

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing User ID",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title designNumber media",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const validItems = cart.items.filter((productItem) => productItem.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = mapCartItems(validItems);

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error in fetchCartItems:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching cart items",
    });
  }
};

// Update cart item quantity
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found!",
      });
    }

    cart.items[productIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "media title designNumber image",
    });

    const populateCartItems = mapCartItems(cart.items);

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error in updateCartItemQty:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating cart item",
    });
  }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId || !mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice media",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId);
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title designNumber media",
    });

    const populateCartItems = mapCartItems(cart.items);

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error in deleteCartItem:", error);
    res.status(500).json({
      success: false,
      message: "Error while deleting cart item",
    });
  }
};

const emptyCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing User ID",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = []; // Empty the cart
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart emptied successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error in emptyCart:", error);
    res.status(500).json({
      success: false,
      message: "Error while emptying cart",
    });
  }
};
module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
  emptyCart
};
