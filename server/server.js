require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging
console.log("Using Fast2SMS API Key:", process.env.FAST2SMS_API_KEY); // Debugging

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // ✅ Import bcrypt for hashing
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const { sendInvoiceEmail } = require("./controllers/common/emailService");
const contactRoutes = require("./routes/common/contactRoutes");
const User = require("./models/User"); // ✅ Import User model
const OTP = require("./models/OTP");   // ✅ Import OTP model from the new file

const emailRoutes = require("./routes/admin/email-routes"); // ✅ Import email routes
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  });

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://kashvi-creation-e4iv.vercel.app",
      "https://kashvi-creation.vercel.app",
      "https://kashvi-creation-rudrasuthar09.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);

app.use(express.json());

// ✅ Route to send OTP
app.post("/api/auth/send-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date(Date.now() + 5 * 60000); // 5 minutes expiry

  // Log the Fast2SMS API key
  console.log("Using Fast2SMS API Key:", process.env.FAST2SMS_API_KEY); // Debugging

  // Save OTP in DB
  await OTP.findOneAndUpdate({ phone }, { otp, expiry }, { upsert: true });

  // Send OTP via Fast2SMS
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      new URLSearchParams({
        authorization: process.env.FAST2SMS_API_KEY, // Authorization header
        route: "otp",
        variables_values: otp.toString(),
        numbers: phone,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json({ success: true, message: "OTP sent!" });
  } catch (error) {
    console.log("Error in sending OTP:", error); // Debugging the error
    res.json({ success: false, message: "Error sending OTP", error });
  }
});

// ✅ Route to verify OTP
app.post("/api/auth/verify-otp", async (req, res) => {
  const { phone, enteredOtp } = req.body;
  const userOtp = await OTP.findOne({ phone });

  if (!userOtp) return res.json({ success: false, message: "OTP not found" });
  if (userOtp.otp !== enteredOtp)
    return res.json({ success: false, message: "Invalid OTP" });
  if (new Date() > userOtp.expiry)
    return res.json({ success: false, message: "OTP expired" });

  res.json({ success: true, message: "OTP Verified!" });
});

// ✅ Password Reset Route
// ✅ Password Reset Route (OTP-based) - FIXED
app.post("/api/auth/reset-password-otp", async (req, res) => {
  const { phone, newPassword } = req.body;

  try {
    // Find user by phone
    const user = await User.findOne({ phone });

    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // ✅ FIX: Use updateOne instead of save
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    console.log("✅ OTP Password reset successful for user:", user.phone);

    res.json({ success: true, message: "Password reset successful!" });
  } catch (error) {
    console.error("❌ Error in OTP password reset:", error);
    res.status(500).json({ success: false, message: "Error resetting password" });
  }
});

// ✅ Add Existing Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.post("/api/send-invoice", sendInvoiceEmail);
app.use("/api", contactRoutes);

// ✅ Add Email Routes
app.use("/api/admin", emailRoutes);

// ✅ Logout Route
app.post("/api/auth/logout", (req, res) => {
  console.log("🔹 Logout request received...");
  console.log("🔹 Cookies received:", req.cookies);

  const token = req.cookies?.token;
  console.log("🔹 Token from cookies:", token);

  if (!token) {
    console.log("❌ No token found in cookies!");
    return res.status(400).json({ success: false, message: "No token provided!" });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  console.log("✅ Token cleared from cookies.");
  res.json({ success: true, message: "Logged out successfully." });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));