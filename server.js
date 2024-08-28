const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/db');
const verifyToken = require('./middleware/verifyToken');
const path = require('path');
const twilio = require('twilio');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectToDatabase();

// Middleware (Permissive CORS for development - adjust for production)
app.use(cors()); 
app.use(express.json());
app.use(helmet());

// Twilio configuration
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Route imports 
// ... (rest of the route imports remain the same)

// Serve static files
app.use('/uploads', express.static('uploads'));

// Example route for sending SMS 
app.post('/api/send-sms', verifyToken, async (req, res) => {
    // ... (rest of the SMS sending logic remains the same)
});

// Define routes
// ... (rest of the route definitions remain the same)

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
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
