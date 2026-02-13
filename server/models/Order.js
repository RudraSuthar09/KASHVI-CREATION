const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      quantity:Number
    },
  ],
  addressInfo: {
    name: String,
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  orderDate: Date,
  orderUpdateDate: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
