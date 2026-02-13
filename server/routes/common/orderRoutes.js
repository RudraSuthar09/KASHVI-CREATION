const express = require("express");
const router = express.Router();
const { sendInvoiceEmail } = require("../controllers/emailService");

router.post("/send-invoice", async (req, res) => {
    const { userEmail, invoiceHtml } = req.body; // Get email & invoice content from frontend

    if (!userEmail || !invoiceHtml) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await sendInvoiceEmail(userEmail, invoiceHtml);
        res.status(200).json({ success: true, message: "Invoice sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error sending invoice" });
    }
});

module.exports = router;
