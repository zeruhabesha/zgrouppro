const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
  },
}).single('logoUrl'); // Name of the file input field

// Create a new company
const createCompany = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err.message);
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    const {
      name,
      email,
      password,
      companyType,
      category,
      subcategory,
      address,
      phoneNumber,
      website,
      description,
      status,
      taxId,
      businessLicense,
      socialMedia,
      promotionStartDate,
      promotionEndDate,
      paymentDetails,
      contactPerson,
    } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const logoUrl = req.file ? req.file.path : '';

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newCompany = new Company({
        name,
        email,
        password: hashedPassword,
        companyType,
        category,
        subcategory: Array.isArray(subcategory) ? subcategory : [subcategory],
        address,
        phoneNumber,
        website,
        description,
        status,
        taxId,
        businessLicense,
        socialMedia,
        promotionStartDate,
        promotionEndDate,
        paymentDetails,
        contactPerson,
        logoUrl,
      });

      await newCompany.save();

      res.status(201).json(newCompany);
    } catch (error) {
      console.error('Error creating company:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      } else if (error.code === 11000) {
        return res.status(400).json({ message: 'Duplicate company email' });
      }

      res.status(500).json({ message: 'Server error', error });
    }
  });
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a company by ID
const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ message: 'Promotion setup not found' });
    }

   // Serve the media file if it exists
   if (company.logoUrl) {
    const logoUrl = path.resolve(company.logoUrl);
    return res.sendFile(logoUrl, (err) => {
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

// Update a company by ID
const updateCompany = (req, res) => {
  const { id } = req.params;

  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err.message);
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    const {
      name,
      email,
      companyType,
      category,
      subcategory,
      address,
      phoneNumber,
      website,
      description,
      status,
      taxId,
      businessLicense,
      socialMedia,
      promotionStartDate,
      promotionEndDate,
      paymentDetails,
      contactPerson,
    } = req.body;

    try {
      // Fetch the existing company
      const company = await Company.findById(id);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      // Prepare the update data
      const updateData = {
        name,
        email,
        companyType,
        category,
        subcategory: Array.isArray(subcategory) ? subcategory : [subcategory],
        address,
        phoneNumber,
        website,
        description,
        status,
        taxId,
        businessLicense,
        socialMedia,
        promotionStartDate,
        promotionEndDate,
        paymentDetails,
        contactPerson,
      };

      if (req.file) {
        // Delete the old logo if it exists
        if (company.logoUrl && fs.existsSync(company.logoUrl)) {
          fs.unlink(company.logoUrl, (err) => {
            if (err) {
              console.error('Error deleting old logo file:', err);
            }
          });
        }
        // Update with the new logo file
        updateData.logoUrl = req.file.path;
      }

      // Update the company with new data
      const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });

      res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
    } catch (error) {
      console.error('Error updating company:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      } else if (error.code === 11000) {
        return res.status(400).json({ message: 'Duplicate company email' });
      }

      res.status(500).json({ message: 'Server error', error });
    }
  });
};


// Delete a company by ID
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Delete the logo file if it exists
    if (company.logoUrl && company.logoUrl.path) {
      fs.unlink(company.logoUrl.path, (err) => {
        if (err) {
          console.error('Error deleting logo file:', err);
        }
      });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
