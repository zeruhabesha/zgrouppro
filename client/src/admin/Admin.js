import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Footer from './components/AdminFooter';
import Sidebar from './components/Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', password: '', role: '' });
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [confirmEditModal, setConfirmEditModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('/api/admins', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/admins/create',
        newAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmins([...admins, response.data.newAdmin]);
      setModalIsOpen(false);
      setNewAdmin({ username: '', email: '', password: '', role: '' });
    } catch (error) {
      console.error('Error creating admin', error);
    }
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setNewAdmin(admin);
    setConfirmEditModal(true);
  };

  const confirmEdit = () => {
    setConfirmEditModal(false);
    setModalIsOpen(true);
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/admins/${editingAdmin._id}`,
        newAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedAdmins = admins.map((admin) =>
        admin._id === editingAdmin._id ? response.data.admin : admin
      );
      setAdmins(updatedAdmins);
      setModalIsOpen(false);
      setEditingAdmin(null);
      setNewAdmin({ username: '', email: '', password: '', role: '' });
    } catch (error) {
      console.error('Error updating admin', error);
    }
  };

  const handleDeleteAdmin = (admin) => {
    setAdminToDelete(admin);
    setConfirmDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admins/${adminToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(admins.filter((admin) => admin._id !== adminToDelete._id));
      setConfirmDeleteModal(false);
    } catch (error) {
      console.error('Error deleting admin', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />

      <div className="flex flex-grow">
        <Sidebar />

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
          <Button onClick={() => setModalIsOpen(true)} className="mb-4">
            Create New Admin
          </Button>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="border-b">
                  <td className="py-2 px-4">{admin.username}</td>
                  <td className="py-2 px-4">{admin.email}</td>
                  <td className="py-2 px-4">{admin.role}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <Button variant="primary" className="btn btn-primary no-underline" onClick={() => handleEditAdmin(admin)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger" className="btn btn-danger no-underline" 
                    //   className="text-white"
                      onClick={() => handleDeleteAdmin(admin)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />

      {/* Create/Edit Admin Modal */}
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingAdmin ? 'Edit Admin' : 'Create Admin'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingAdmin ? handleUpdateAdmin : handleCreateAdmin}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newAdmin.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={newAdmin.role}
                onChange={handleInputChange}
                placeholder="Enter role"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              {editingAdmin ? 'Update Admin' : 'Create Admin'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={confirmDeleteModal} onHide={() => setConfirmDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this admin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Edit Modal */}
      <Modal show={confirmEditModal} onHide={() => setConfirmEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to edit this admin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
