const express = require('express');
const sendEmail = require('../../controllers/common/sendEmail');
const User = require('../../models/User');

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { subject, message } = req.body;

  try {
    const users = await User.find(); // Fetch all users
    const emailPromises = users.map((user) => sendEmail(user.email, subject, message));
    await Promise.all(emailPromises);

    res.status(200).send('Emails sent successfully');
  } catch (error) {
    res.status(500).send('Error sending emails');
  }
});

module.exports = router;