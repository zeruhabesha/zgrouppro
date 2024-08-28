const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PromotionSetup = require('../models/promotionSetup');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append file extension
  }
});

// const upload = multer({ storage });

const upload = multer({ storage: storage }).single('file');

// Create a new promotion setup
const createPromotionSetup = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', error: err });
    }

    try {
      const { title, description, mediaType, targetUrl, startDate, endDate, status } = req.body;
      const media = req.file ? req.file.path : null;
      const newPromotion = new PromotionSetup({ title, description, mediaType, media, targetUrl, startDate, endDate, status });
      await newPromotion.save();
      res.status(201).json(newPromotion);
    } catch (error) {
      console.error('Error creating promotion setup:', error); 
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      } else if (error.code === 11000) {
        return res.status(400).json({ message: 'Duplicate promotion title' });
      } else {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    }
  });
};

// Get all promotion setups
const getAllPromotionSetups = async (req, res) => {
  try {
    const promotionSetups = await PromotionSetup.find();
    res.status(200).json(promotionSetups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a promotion setup by ID
const getPromotionSetupById = async (req, res) => {
  const { id } = req.params;

  try {
    const promotionSetup = await PromotionSetup.findById(id);

    if (!promotionSetup) {
      return res.status(404).json({ message: 'Promotion setup not found' });
    }

    // Serve the media file if it exists
    if (promotionSetup.media) {
      const mediaPath = path.resolve(promotionSetup.media);
      return res.sendFile(mediaPath, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error serving file', error: err });
        }
      });
    } else {
      return res.status(404).json({ message: 'Media file not found' });
    }
  } catch (error) {
    console.error('Error retrieving promotion setup:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a promotion setup by ID
const updatePromotionSetup = async (req, res) => {
  const { id } = req.params;

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { title, description, mediaType, targetUrl, startDate, endDate, status } = req.body;

    try {
      if (!title || !description || !mediaType || !targetUrl || !startDate || !endDate || !status) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const updateData = {
        title,
        description,
        mediaType,
        targetUrl,
        startDate,
        endDate,
        status
      };

      if (req.file) {
        updateData.media = req.file.path;
      }

      const promotionSetup = await PromotionSetup.findByIdAndUpdate(id, updateData, { new: true });

      if (!promotionSetup) {
        return res.status(404).json({ message: 'Promotion setup not found' });
      }

      res.status(200).json({ message: 'Promotion setup updated successfully', promotionSetup });
    } catch (error) {
      console.error('Error updating promotion setup:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error', error });
      }
    }
  });
};

// Delete a promotion setup by ID
const deletePromotionSetup = async (req, res) => {
  const { id } = req.params;

  try {
    const promotionSetup = await PromotionSetup.findByIdAndDelete(id);

    if (!promotionSetup) {
      return res.status(404).json({ message: 'Promotion setup not found' });
    }

    // Delete the media file if it exists
    if (promotionSetup.media) {
      fs.unlink(promotionSetup.media, (err) => {
        if (err) {
          console.error('Error deleting media file:', err);
        }
      });
    }

    res.status(200).json({ message: 'Promotion setup deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createPromotionSetup,
  getAllPromotionSetups,
  getPromotionSetupById,
  updatePromotionSetup,
  deletePromotionSetup
};
