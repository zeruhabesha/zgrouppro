import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Toast } from 'react-bootstrap';
import axios from 'axios';
import AdminNavbar from './components/AdminNavbar';
import AdminFooter from './components/AdminFooter';
import Sidebar from './components/Sidebar';

const Promotion = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(6);
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [file, setFile] = useState(null);

  // Function to get the token from localStorage
  const token = localStorage.getItem('token');

    const fetchPromotions = async () => {
      try {
        const response = await axios.get('/api/promotions');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    
   useEffect(() => {
    fetchPromotions(); // Call fetchPromotions on component mount
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value || '';
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  
  const handleShowModal = (promotion) => {
    setCurrentPromotion(promotion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAddModal(false);
    setCurrentPromotion(null);
    setFile(null);
  };

  const handleUpdatePromotion = async (e) => {
    e.preventDefault();
  
    if (!currentPromotion) return; // Add this check
  
    const formData = new FormData();
    Object.keys(currentPromotion).forEach(key => formData.append(key, currentPromotion[key]));
    if (file) {
      formData.append('file', file);
    }
    try {
      await axios.put(`/api/promotions/${currentPromotion._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      fetchPromotions();
      handleCloseModal();
      setToastMessage('Promotion updated successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Error updating promotion:', error);
      setToastMessage('Error updating promotion');
      setShowToast(true);
    }
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();
  
    if (!currentPromotion) return; // Add this check
  
    const formData = new FormData();
    for (const key in currentPromotion) {
      if (currentPromotion[key]) {
        formData.append(key, currentPromotion[key]);
      }
    }
    if (file) {
      formData.append('file', file);
    }
    try {
      await axios.post('/api/promotions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      fetchPromotions();
      handleCloseModal();
      setToastMessage('Promotion added successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Error adding promotion:', error);
      setToastMessage('Error adding promotion');
      setShowToast(true);
    }
  };

  const handleDeletePromotion = async () => {
    try {
      await axios.delete(`/api/promotions/${promotionToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPromotions();
      setToastMessage('Promotion deleted successfully');
      setShowToast(true);
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting promotion:', error);
      setToastMessage('Error deleting promotion');
      setShowToast(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPromotion({ ...currentPromotion, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="flex flex-col min-h-screen">
    <AdminNavbar />
    <div className="flex flex-grow">
      <Sidebar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Promotion Management</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Promotion</Button>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border rounded w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {currentAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white p-6 rounded-lg shadow-md">
              {announcement.media && (
                <img src={`/${announcement.media}`} className="w-full h-48 object-cover rounded-lg mb-4" alt={announcement.title} />
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{announcement.title}</h2>
              <p className="text-gray-600 mb-4">{announcement.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600">{announcement.date}</span>
                <span className="text-gray-500">{announcement.author}</span>
              </div>
            </div>
          ))} */}

<Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Media</th>
                <th>Media Type</th>
                <th>Target URL</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentAnnouncements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>{announcement.title}</td>
                  <td>{announcement.description}</td>
                  <td>
                  {announcement.media && (
                <img src={`/${announcement.media}`} className="w-10 h-10 object-cover rounded-lg mb-4" alt={announcement.title} />
              )}
                  </td>

                  <td>{announcement.mediaType}</td>
                  <td>{announcement.targetUrl}</td>
                  <td>{new Date(announcement.startDate).toLocaleDateString()}</td>
                  <td>{new Date(announcement.endDate).toLocaleDateString()}</td>
                  <td>{announcement.status}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleShowModal(announcement)}>Edit</Button>
                    <Button variant="danger" onClick={() => {
                      setPromotionToDelete(announcement._id);
                      setShowConfirmDelete(true);
                    }}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </div>

        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredAnnouncements.length / announcementsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'} rounded hover:bg-blue-700 transition duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Update Promotion Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Promotion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentPromotion && (
                <Form onSubmit={handleUpdatePromotion}>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={currentPromotion.title || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={currentPromotion.description || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formMediaType">
                    <Form.Label>Media Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="mediaType"
                      value={currentPromotion.mediaType || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formTargetUrl">
                    <Form.Label>Target URL</Form.Label>
                    <Form.Control
                      type="url"
                      name="targetUrl"
                      value={currentPromotion.targetUrl || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={currentPromotion.startDate ? currentPromotion.startDate.split('T')[0] : ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={currentPromotion.endDate ? currentPromotion.endDate.split('T')[0] : ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      name="status"
                      value={currentPromotion.status || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Form>
              )}
            </Modal.Body>
          </Modal>

          {/* Add Promotion Modal */}
          <Modal show={showAddModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Promotion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddPromotion}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={currentPromotion?.title || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={currentPromotion?.description || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formMediaType">
                  <Form.Label>Media Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="mediaType"
                    value={currentPromotion?.mediaType || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formTargetUrl">
                  <Form.Label>Target URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="targetUrl"
                    value={currentPromotion?.targetUrl || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={currentPromotion?.startDate ? currentPromotion.startDate.split('T')[0] : ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={currentPromotion?.endDate ? currentPromotion.endDate.split('T')[0] : ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="status"
                    value={currentPromotion?.status || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formFile">
                  <Form.Label>File</Form.Label>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Promotion
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Confirm Delete Modal */}
          <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this promotion?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeletePromotion}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Toast Notifications */}
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            style={{ position: 'absolute', bottom: '20px', right: '20px' }}
          >
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default Promotion;