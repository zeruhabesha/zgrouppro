const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin
} = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');

// Admin login (no token required)
router.post('/login', adminLogin);

// Create a new admin (protected route)
router.post('/create', verifyToken,createAdmin);

// Get all admins (protected route)
router.get('/', verifyToken, getAllAdmins);

// Get a specific admin by ID (protected route)
router.get('/:id', verifyToken, getAdminById);

// Update a specific admin by ID (protected route)
router.put('/:id', verifyToken, updateAdmin);

// Delete a specific admin by ID (protected route)
router.delete('/:id', verifyToken, deleteAdmin);

module.exports = router;
