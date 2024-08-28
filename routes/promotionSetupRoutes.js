const express = require('express');
const {
  createPromotionSetup,
  getAllPromotionSetups,
  getPromotionSetupById,
  updatePromotionSetup,
  deletePromotionSetup
} = require('../controllers/promotionSetupController');
const verifyToken = require('../middleware/verifyToken');
const path = require('path');
const fs = require('fs');
const { PromotionSetup } = require('../models/promotionSetup');

const router = express.Router();

// POST route to create a new promotion setup with media file upload
router.post('/', verifyToken, createPromotionSetup);

// GET route to fetch all promotion setups
router.get('/', getAllPromotionSetups);

// GET route to fetch a promotion setup by ID
router.get('/:id', getPromotionSetupById);

// PUT route to update a promotion setup by ID with optional media file update
router.put('/:id', verifyToken, updatePromotionSetup);

// DELETE route to remove a promotion setup by ID
router.delete('/:id', verifyToken, deletePromotionSetup);

// Route to get media file by promotion setup ID
router.get('/promotions/:id/media', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the promotion setup by ID
    const promotionSetup = await PromotionSetup.findById(id);

    // Check if the promotion setup exists and has media
    if (!promotionSetup || !promotionSetup.media || !promotionSetup.media.path) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Resolve the full path of the media file
    const mediaPath = path.resolve(promotionSetup.media.path);

    // Check if the file exists
    if (!fs.existsSync(mediaPath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Send the file
    res.sendFile(mediaPath, { root: '.' }, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error serving file', error: err });
      }
    });
  } catch (error) {
    console.error('Error retrieving media:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
