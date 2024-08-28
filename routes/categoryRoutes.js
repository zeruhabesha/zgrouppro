const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getSubcategoriesByCategoryId, // Import the function
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// POST route to create a new category
router.post('/', verifyToken, createCategory);

// GET route to fetch all categories
router.get('/', getAllCategories);

// GET route to fetch a category by ID
router.get('/:id', getCategoryById);

// GET route to fetch subcategories by category ID
router.get('/subcategories/:categoryId', getSubcategoriesByCategoryId); // Add this route

// PUT route to update a category by ID
router.put('/:id', verifyToken, updateCategory);

// DELETE route to remove a category by ID
router.delete('/:id', verifyToken, deleteCategory);

module.exports = router;
