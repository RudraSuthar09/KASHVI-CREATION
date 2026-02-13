require("dotenv").config();
const nodemailer = require("nodemailer");

exports.sendInvoiceEmail = async (req, res) => {
    try {
        const { userEmail, invoiceHtml } = req.body;

        if (!userEmail || !invoiceHtml) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        console.log("📧 Sending invoice email to:", userEmail);
        console.log("📧 Using email:", process.env.EMAIL_USER_INVOICE);

        // ✅ FIXED: Use explicit host, port, and secure settings
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // false for port 587, true for 465
            auth: {
                user: process.env.EMAIL_USER_INVOICE,
                pass: process.env.EMAIL_PASS_INVOICE,
            },
        });

        // ✅ Verify transporter before sending
        try {
            await transporter.verify();
            console.log("✅ SMTP connection verified for invoice email");
        } catch (verifyError) {
            console.error("❌ SMTP verification failed:", verifyError.message);
            throw verifyError;
        }

        // ✅ Email options
        const mailOptions = {
            from: `"Kashvi Creations" <${process.env.EMAIL_USER_INVOICE}>`,
            to: [userEmail, process.env.EMAIL_USER_INVOICE], // Send to user and admin
            subject: "Your Order Invoice - Kashvi Creations",
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; padding: 20px 0;">
                        <h2 style="color: #0a373b; margin: 0;">Kashvi Creations</h2>
                        <p style="color: #666; margin: 5px 0;">Tax Invoice</p>
                    </div>
                    
                    <p style="font-size: 16px; color: #555;">Dear Customer,</p>
                    <p style="font-size: 16px; color: #555;">Thank you for your order! Please find your invoice details below:</p>
                    
                    <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #f9f9f9; margin: 20px 0;">
                        ${invoiceHtml}
                    </div>
        
                    <p style="font-size: 16px; color: #555; margin-top: 20px;">Thank you for shopping with us!</p>
                    <p style="font-size: 16px; font-weight: bold; color: #0a373b;">- Kashvi Creations Team</p>
        
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    
                    <div style="text-align: center; font-size: 14px; color: #777;">
                        <p style="margin: 10px 0;">For any queries, contact us:</p>
                        <p style="margin: 5px 0;">📧 <a href="mailto:${process.env.EMAIL_USER_INVOICE}" style="color: #0a373b; text-decoration: none;">${process.env.EMAIL_USER_INVOICE}</a></p>
                        <p style="margin: 20px 0; color: #999; font-size: 12px;">© 2026 Kashvi Creations. All rights reserved.</p>
                    </div>
                </div>
            </div>
            `,
        };

        // ✅ Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Invoice email sent successfully! Message ID: ${info.messageId}`);

        return res.status(200).json({ 
            success: true, 
            message: "Invoice sent successfully to your email!" 
        });

    } catch (error) {
        console.error("❌ Email Sending Error:", error.message);
        console.error("Full error:", error);
        
        // Better error handling
        if (error.code === 'EAUTH') {
            return res.status(500).json({ 
                success: false, 
                message: "Email authentication failed. Please contact support." 
            });
        }
        
        if (error.code === 'ESOCKET') {
            return res.status(500).json({ 
                success: false, 
                message: "Network error. Please check your connection." 
            });
        }
        
        return res.status(500).json({ 
            success: false, 
            message: "Failed to send invoice email. Please try again." 
        });
    }
};