import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './components/AdminNavbar';
import Footer from './components/AdminFooter';
import Sidebar from './components/Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', subcategories: [] });
  const [editingCategory, setEditingCategory] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'subcategories') {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleAddSubcategory = () => {
    setNewCategory({
      ...newCategory,
      subcategories: [...newCategory.subcategories, '']
    });
  };

  const handleRemoveSubcategory = (index) => {
    const updatedSubcategories = newCategory.subcategories.filter((_, i) => i !== index);
    setNewCategory({ ...newCategory, subcategories: updatedSubcategories });
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = newCategory.subcategories.map((sub, i) => (i === index ? value : sub));
    setNewCategory({ ...newCategory, subcategories: updatedSubcategories });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/categories',
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories([...categories, response.data.newCategory]);
      setModalIsOpen(false);
      setNewCategory({ name: '', description: '', subcategories: [] });
    } catch (error) {
      console.error('Error creating category', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
    setModalIsOpen(true);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/categories/${editingCategory._id}`,
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCategories = categories.map((category) =>
        category._id === editingCategory._id ? response.data.updatedCategory : category
      );
      setCategories(updatedCategories);
      setModalIsOpen(false);
      setEditingCategory(null);
      setNewCategory({ name: '', description: '', subcategories: [] });
    } catch (error) {
      console.error('Error updating category', error);
    }
  };

  const openDeleteConfirmModal = (category) => {
    setCategoryToDelete(category);
    setDeleteConfirmModal(true);
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`/api/categories/${categoryToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category._id !== categoryToDelete._id));
      setDeleteConfirmModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />

      <div className="flex flex-grow">
        <Sidebar />

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Category Management</h1>
          <Button onClick={() => setModalIsOpen(true)} className="mb-4">
            Create New Category
          </Button>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Subcategories</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id} className="border-b">
                    <td className="py-2 px-4">{category.name || 'N/A'}</td>
                    <td className="py-2 px-4">{category.description || 'N/A'}</td>
                    <td className="py-2 px-4">
                      {category.subcategories && category.subcategories.length > 0
                        ? category.subcategories.join(', ')
                        : 'N/A'}
                    </td>
                    <td className="py-2 px-4 flex space-x-2">
                      <Button
                        variant=""
                        className="btn btn-primary no-underline"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant=""
                        className="btn btn-danger no-underline"
                        onClick={() => openDeleteConfirmModal(category)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center">No categories available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />

      {/* Modal for creating/updating categories */}
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCategory ? 'Edit Category' : 'Create Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCategory.name || ''}
                onChange={handleInputChange}
                placeholder="Enter category name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newCategory.description || ''}
                onChange={handleInputChange}
                placeholder="Enter category description"
              />
            </Form.Group>

            <Form.Group controlId="formSubcategories" className="mt-3">
              <Form.Label>Subcategories</Form.Label>
              {newCategory.subcategories.map((sub, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    value={sub}
                    onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                    placeholder={`Subcategory ${index + 1}`}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveSubcategory(index)}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="secondary" onClick={handleAddSubcategory} className="mt-2">
                Add Subcategory
              </Button>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={deleteConfirmModal} onHide={() => setDeleteConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
