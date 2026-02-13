const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for email user
    pass: process.env.EMAIL_PASS, // Use environment variable for email password
  },
});

module.exports = transporter;