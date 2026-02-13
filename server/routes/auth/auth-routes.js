const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const zxcvbn = require("zxcvbn");
const User = require("../../models/User");
const OTP = require("../../models/OTP");
const axios = require("axios");

const router = express.Router();

// 📌 Register Route
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists!" });
    }

    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 2) {
      return res.status(400).json({
        success: false,
        message: "Password is too weak! Use a stronger password.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ success: true, message: "User registered successfully!" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 📌 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, token, user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// 📌 Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found!" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"Kashvi Creations" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request - Kashvi Creations",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #0a373b;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You requested to reset your password for your Kashvi Creations account.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; padding: 12px 30px; background-color: #0a373b; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>Or copy this link:</p>
          <p style="color: #666; word-break: break-all; background: #f5f5f5; padding: 10px;">${resetLink}</p>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">⏰ This link expires in 1 hour.</p>
          <p style="color: #999; font-size: 14px;">If you didn't request this, ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent to:", email);

    res.json({ success: true, message: "Reset link sent to your email." });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});


// 📌 Reset Password Route (FIXED)
// 📌 Reset Password Route (FIXED)
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    // ✅ Validate password strength using zxcvbn
    const passwordStrength = zxcvbn(newPassword);
    if (passwordStrength.score < 2) {
      return res.status(400).json({
        success: false,
        message: "Password is too weak! Use a stronger password.",
      });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // ✅ Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // ✅ FIX: Use updateOne instead of save
    await User.updateOne(
      { _id: decoded.userId },
      { $set: { password: hashedPassword } }
    );

    console.log("✅ Password reset successfully for user:", user.email);

    res.json({ success: true, message: "Password has been reset successfully." });

  } catch (error) {
    console.error("❌ Error resetting password:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ success: false, message: "Invalid or expired reset link." });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ success: false, message: "Reset link has expired." });
    }
    
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 📌 OTP Routes
router.post("/send-reset-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date(Date.now() + 5 * 60000);

  await OTP.findOneAndUpdate({ phone }, { otp, expiry }, { upsert: true });

  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      new URLSearchParams({
        authorization: process.env.FAST2SMS_API_KEY,
        route: "otp",
        variables_values: otp.toString(),
        numbers: phone,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json({ success: true, message: "OTP sent!" });
  } catch (error) {
    res.json({ success: false, message: "Error sending OTP", error });
  }
});

router.post("/verify-reset-otp", async (req, res) => {
  const { phone, enteredOtp } = req.body;

  const otpRecord = await OTP.findOne({ phone });

  if (!otpRecord || otpRecord.otp !== parseInt(enteredOtp)) {
    return res.json({ success: false, message: "Invalid OTP" });
  }

  if (new Date() > otpRecord.expiry) {
    return res.json({ success: false, message: "OTP expired" });
  }

  res.json({ success: true, message: "OTP verified!" });
});

// 📌 Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged out successfully!" });
});

// 📌 Check Auth Route
router.get("/check-auth", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

module.exports = router;