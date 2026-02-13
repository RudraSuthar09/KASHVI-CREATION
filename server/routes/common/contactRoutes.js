const express = require("express");
const router = express.Router();
const Contact = require("../../models/Contact");

// POST: Submit Contact Form
router.post("/contact", async (req, res) => {
  try {
    const { name, contactn, email, subject, message } = req.body;
    console.log("📩 Received Contact Form Data:", req.body);

    // Validate required fields
    if (!name || !contactn || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Create a new contact entry
    const newContact = new Contact({
      name,
      contactn,
      email,
      subject,
      message,
      status: "pending", // Default status
    });

    // Save to database
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Your message has been received. We will contact you soon!",
      data: newContact, // Sending saved contact data for reference
    });
  } catch (error) {
    console.error("❌ Error saving contact form:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message, // Sending error details for debugging
    });
  }
});

// GET: Fetch All Contact Messages
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Fetch all contacts, sorted by newest first
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts.",
      error: error.message,
    });
  }
});

module.exports = router;
