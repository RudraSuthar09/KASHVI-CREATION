const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phone: String,
  otp: String,
  expiry: Date,
});

// Check if the model already exists to avoid overwriting it
let OTP;
try {
  OTP = mongoose.model("OTP");
} catch (error) {
  OTP = mongoose.model("OTP", otpSchema);
}

module.exports = OTP;
