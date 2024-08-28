const mongoose = require('mongoose');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true }, // Encrypted password
  role: { 
    type: String, 
    enum: ['superadmin', 'admin', 'moderator'], // Possible roles
    default: 'admin' 
  },
  createdAt: { type: Date, default: Date.now }, // When the admin was created
  updatedAt: { type: Date, default: Date.now }, // When the admin details were last updated
});

// Middleware to update `updatedAt` field before saving
adminSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compile model from schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
