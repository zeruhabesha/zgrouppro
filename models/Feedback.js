const mongoose = require('mongoose');

// Define the schema for the Feedback model
const feedbackSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], // Simple email validation
  },
  feedbackType: {
    type: String,
    required: true,
    enum: ['Bug Report', 'Feature Request', 'General Inquiry', 'Other'], // Feedback types can be expanded
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Reviewed', 'Resolved'], // To track feedback status
  },
  response: {
    type: String,
  },
});

// Create the Feedback model using the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
