const express = require('express');
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getCompanyBycatagoryId
} = require('../controllers/companyController');
const verifyToken = require('../middleware/verifyToken');
const path = require('path');
const fs = require('fs');
const { Company } = require('../models/Company');

const router = express.Router();

// POST route to create a new company
router.post('/', verifyToken, createCompany);

// GET route to fetch all companies
router.get('/', getAllCompanies);

// GET route to fetch a company by ID
router.get('/:id', getCompanyById);

// PUT route to update a company by ID
router.put('/:id', verifyToken, updateCompany);

// DELETE route to remove a company by ID
router.delete('/:id', verifyToken, deleteCompany);
// Route to get media file by promotion setup ID
router.get('/company/:id/logoUrl', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the promotion setup by ID
    const promotionSetup = await Company.findById(id);

    // Check if the promotion setup exists and has media
    if (!promotionSetup || !promotionSetup.logoUrl || !promotionSetup.logoUrl.path) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Resolve the full path of the media file
    const mediaPath = path.resolve(promotionSetup.logoUrl.path);

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
