const mongoose = require("mongoose");
const Order = require("../../models/Order");
const User = require("../../models/User");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({}).lean();

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    // Order.userId is stored as a plain string, so it can't be populated
    // directly — look up the matching emails so the admin UI can search by
    // customer email without a separate request per order.
    const userIds = [
      ...new Set(orders.map((order) => order.userId).filter((id) => mongoose.isValidObjectId(id))),
    ];
    const users = userIds.length
      ? await User.find({ _id: { $in: userIds } }).select("email").lean()
      : [];
    const emailByUserId = new Map(users.map((user) => [String(user._id), user.email]));

    const ordersWithCustomerEmail = orders.map((order) => ({
      ...order,
      customerEmail: emailByUserId.get(String(order.userId)) || null,
    }));

    res.status(200).json({
      success: true,
      data: ordersWithCustomerEmail,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
