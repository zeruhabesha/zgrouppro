const Category = require('../models/Category');

// Create a new category
const createCategory = async (req, res) => {
  const { name, description, subcategories } = req.body;

  try {
    const newCategory = new Category({
      name,
      description,
      subcategories,
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get subcategories by category ID
const getSubcategoriesByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category.subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getSubcategoriesByCategoryId, // Added function to get subcategories by category ID
  updateCategory,
  deleteCategory
};
