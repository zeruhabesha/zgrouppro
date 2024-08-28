const mongoose = require('mongoose');

// Define the schema for the Subscription Plan model
const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate plans
  },
  description: {
    type: String,
    required: true, // Provide details about the plan
  },
  price: {
    type: Number,
    required: true, // The cost of the plan
  },
  duration: {
    type: String,
    required: true, // Duration of the subscription (e.g., 'Monthly', 'Yearly')
    enum: ['Monthly', 'Yearly'], // Valid options
  },
  features: [String], // List of features included in the plan
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

// Create the SubscriptionPlan model using the schema
const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

module.exports = SubscriptionPlan;
