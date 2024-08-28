const mongoose = require('mongoose');

// Define the schema for the Category model
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  subcategories: [{
    type: String,
  }],  // Array of subcategory names
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Category model using the schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
