const Contact = require("../../models/Contact");

// Create Contact - Save form data to database
const createContact = async (req, res) => {
  try {
    const { name, contactn, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !contactn || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create new contact entry
    const contact = new Contact({
      name,
      contactn,
      email,
      subject,
      message,
      status: "pending", // Default status
    });

    // Save to MongoDB
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error in createContact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
      error: error.message, // Send error details for debugging
    });
  }
};

// Fetch All Contacts - Retrieve saved contact messages
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all documents from MongoDB
    res.status(200).json({
      success: true,
      data: contacts, // Send contacts as response
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

module.exports = { createContact, getContacts };
