const mongoose = require('mongoose');

const promotionSetupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
  media: { 
    path: String, // File path for the media
    contentType: String, // MIME type for the media file
  },
  targetUrl: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const PromotionSetup = mongoose.model('PromotionSetup', promotionSetupSchema);

module.exports = PromotionSetup;
