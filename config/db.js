const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

// MongoDB connection URL from environment variable or fallback to localhost
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://<atlasadmin>:<1354@atlas>@cluster0.mongodb.net/zgroup?retryWrites=true&w=majority';

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Event listeners for connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

module.exports = connectToDatabase;
