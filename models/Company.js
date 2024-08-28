const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  registrationDate: { type: Date, default: Date.now },
  promotionDetails: { type: String },
  paymentStatus: { type: Boolean, default: false },
  companyType: { type: String, required: false },
  category: { type: String, required: false },
  subcategory: { type: [String], required: false },  // Array of subcategories
  address: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  website: { type: String },
  description: { type: String },
  status: { type: String, default: 'Active' },
  taxId: { type: String },
  businessLicense: { type: String },
  socialMedia: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    telegram: { type: String },
  },
  promotionStartDate: { type: Date },
  promotionEndDate: { type: Date },
  paymentDetails: {
    paymentMethod: { type: String },
    paymentDate: { type: Date },
    paymentAmount: { type: Number },
  },
  contactPerson: {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
  },
  logoUrl: { 
    path: String, // File path for the media
    contentType: String, // MIME type for the media file
  },
});

module.exports = mongoose.model('Company', companySchema);
