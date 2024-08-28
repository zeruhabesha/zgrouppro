const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/db');
const verifyToken = require('./middleware/verifyToken');
const path = require('path');
const twilio = require('twilio'); // Import Twilio

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL // Allow requests from your frontend URL
}));
app.use(express.json()); // Parse JSON bodies

// Twilio configuration
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Route imports
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const promotionSetupRoutes = require('./routes/promotionSetupRoutes');

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Example route for sending SMS
app.post('/api/send-sms', verifyToken, (req, res) => {
  const { to, message } = req.body;

  // Use Twilio to send the SMS
  twilioClient.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: to
    })
    .then((message) => res.status(200).json({ success: true, message: `Message sent: ${message.sid}` }))
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).json({ success: false, error: error.message });
    });
});

// Define routes
app.use('/api/admins', adminRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/promotions', promotionSetupRoutes);

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
