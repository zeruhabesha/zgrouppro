import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './components/AdminNavbar';
import Sidebar from './components/Sidebar';
import Footer from './components/AdminFooter';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Company = () => {
  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     try {
  //       const response = await axios.get('/api/companies', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //     } catch (error) {
  //       console.error('Error fetching companies:', error);
  //     }
  //   };

  //   fetchCompanies();
  // }, []);

  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCompany, setNewCompany] = useState({
    name: '',
    email: '',
    password: '',
    companyType: '',
    category: '',
    subcategory: [],
    status: 'Active',
    address: '',
    phoneNumber: '',
    website: '',
    description: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      telegram: '',
    },
    promotionStartDate: '',
    promotionEndDate: '',
    paymentDetails: {
      paymentMethod: '',
      paymentDate: '',
      paymentAmount: 0,
    },
    contactPerson: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    logoUrl: '',
  });

  const [categories, setCategories] = useState([]); // List of categories
  const [subcategories, setSubcategories] = useState([]); // List of subcategories based on category
  const [editingCompany, setEditingCompany] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true); // Loading state for categories
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false); // Loading state for subcategories
  const [announcements, setAnnouncements] = useState([]);
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

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCompanies(); // Fetch companies on component mount
    fetchCategories();
}, []);

useEffect(() => {
  if (newCompany.category) {
    fetchSubcategories(newCompany.category);
  } else {
    setSubcategories([]);
  }
}, [newCompany.category]);

const fetchCompanies = async () => {
  try {
    const response = await axios.get('/api/companies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCompanies(response.data);
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

  // useEffect(() => {
  //   setFilteredCompanies(
  //     companies.filter(company =>
  //       company && company.name && company.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // }, [searchQuery, companies]);

  useEffect(() => {
    if (newCompany.category) {
      // Fetch subcategories based on selected category
      fetchSubcategories(newCompany.category);
    }
  }, [newCompany.category]);

  // const fetchCompanies = async () => {
  //   try {
  //     const response = await axios.get('/api/companies', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setCompanies(response.data);
  //   } catch (error) {
  //     console.error('Error fetching companies', error);
  //   }
  // };


  // const fetchPromotions = async () => {
  //   try {
  //     const response = await axios.get('/api/promotions', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setAnnouncements(response.data);
  //   } catch (error) {
  //     console.error('Error fetching promotions:', error);
  //   }
  // };
  const fetchPromotions = async () => {
    try {
      const response = await axios.get('/api/companies');
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
  announcement && announcement.name && announcement.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const indexOfLastAnnouncement = currentPage * announcementsPerPage;
const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};





const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    setIsLoadingCategories(false);
  }
};


const handleInputChange = (e) => {
  const { name, value, type, files } = e.target;

  if (type === 'file') {
    setNewCompany((prev) => ({ ...prev, [name]: files[0] }));
  } else if (name === 'subcategory') {
    const selectedSubcategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewCompany((prev) => ({ ...prev, subcategory: selectedSubcategories }));
  } else if (name === 'category') {
    setNewCompany((prev) => ({ ...prev, category: value, subcategory: [] }));
  } else {
    setNewCompany((prev) => ({ ...prev, [name]: value }));
  }
};


  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevState) => ({
      ...prevState,
      socialMedia: {
        ...prevState.socialMedia,
        [name]: value
      }
    }));
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevState) => ({
      ...prevState,
      paymentDetails: {
        ...prevState.paymentDetails,
        [name]: value
      }
    }));
  };

  const handleContactPersonChange = (e, field) => {
    const { value } = e.target;

    setNewCompany(prevState => ({
      ...prevState,
      contactPerson: {
        ...prevState.contactPerson,
        [field]: value
      }
    }));
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();

    try {
      const companyData = {
        name: newCompany.name,
        email: newCompany.email,
        password: newCompany.password,
        companyType: newCompany.companyType,
        category: newCompany.category,
        subcategory: newCompany.subcategory,
        status: newCompany.status,
        address: newCompany.address,
        phoneNumber: newCompany.phoneNumber,
        website: newCompany.website,
        description: newCompany.description,
        socialMedia: newCompany.socialMedia,
        promotionStartDate: newCompany.promotionStartDate,
        promotionEndDate: newCompany.promotionEndDate,
        paymentDetails: newCompany.paymentDetails,
        contactPerson: newCompany.contactPerson,
      };

      const formData = new FormData();
   
      if (newCompany.logoUrl instanceof File) { 
        formData.append('logoUrl', newCompany.logoUrl);
      }
      for (const key in companyData) {
        if (typeof companyData[key] === 'object') {
          for (const nestedKey in companyData[key]) {
            formData.append(`${key}.${nestedKey}`, companyData[key][nestedKey]);
          }
        } else {
          formData.append(key, companyData[key]);
        }
      }

      const response = await axios.post('/api/companies', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      setCompanies([...companies, response.data.newCompany]);
      setModalIsOpen(false);
      setNewCompany({
        socialMedia: { // Initialize socialMedia here
          facebook: '',
          twitter: '',
          linkedin: '',
          instagram: '',
          telegram: ''
        },
        paymentDetails: {
          paymentMethod: '',
          paymentDate: '',
          paymentAmount: 0
        },
      });
    } catch (error) {
      console.error('Error creating company', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Failed to create company: ${error.response.data.message}`);
      } else {
        alert('Failed to create company. Please try again.');
      }
    }
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setNewCompany({
      ...company,
      category: company.category ? company.category.name : '', // Use category name if available
    }); 
    setModalIsOpen(true);    
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();

    // Check if editingCompany is defined
    if (!editingCompany || !editingCompany._id) {
      console.error('Error updating company: No company selected for editing');
      // Optionally, display an error message to the user
      return; 
    }

    try {
      const formData = new FormData();
  
      // Append data to update (excluding password if empty)
      const dataToUpdate = { ...newCompany };
      if (!dataToUpdate.password) {
        delete dataToUpdate.password;
      } if (newCompany.logoUrl instanceof File) { // Check if it's a new file
        formData.append('logoUrl', newCompany.logoUrl);
      } else {
        // If no new file is selected, keep the existing logoUrl (if any)
        if (editingCompany.logoUrl) {
          formData.append('logoUrl', editingCompany.logoUrl); 
        }
      }
  
      // Append other company data
      for (const key in dataToUpdate) {
        if (typeof dataToUpdate[key] === 'object') {
          for (const nestedKey in dataToUpdate[key]) {
            formData.append(`${key}.${nestedKey}`, dataToUpdate[key][nestedKey]);
          }
        } else {
          formData.append(key, dataToUpdate[key]);
        }
      }
  
      const response = await axios.put(
        `/api/companies/${editingCompany._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
          },
        }
      );

        // const response = await axios.put(
        //     `/api/companies/${editingCompany._id}`,
        //     dataToUpdate,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     }
        // );

      const updatedCompanies = companies.map((company) =>
        company._id === editingCompany._id ? response.data.updatedCompany : company
      );
      setCompanies(updatedCompanies);
      setModalIsOpen(false);
      setEditingCompany(null);
      setNewCompany({
        name: '',
        email: '',
        password: '',
        companyType: '',
        category: '',
        subcategory: [],
        status: 'Active',
        address: '',
        phoneNumber: '',
        website: '',
        description: '',
        socialMedia: { // Initialize socialMedia here
          facebook: '',
          twitter: '',
          linkedin: '',
          instagram: '',
          telegram: ''
        },
        promotionStartDate: '',
        promotionEndDate: '',
        paymentDetails: {
          paymentMethod: '',
          paymentDate: '',
          paymentAmount: ''
        },
        contactPerson: {
          name: '',
          email: '',
          phoneNumber: ''
        },
        logoUrl: ''
      });
    } catch (error) {
      console.error('Error updating company:', error); 
    }
  };

  const handleDeleteCompany = async () => {
    try {
      await axios.delete(`/api/companies/${companyToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(companies.filter((company) => company._id !== companyToDelete));
      setDeleteConfirmModal(false);
    } catch (error) {
      console.error('Error deleting company', error);
    }
  };


  useEffect(() => {
    console.log('Companies:', companies);
  }, [companies]);
  
  useEffect(() => {
    console.log('Filtered Companies:', filteredCompanies);
  }, [filteredCompanies]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories',   
 error);
        // Optionally, display an error message to the user
      } finally {
        setIsLoadingCategories(false); 
      }
    };

    fetchCategories();
  }, []); 


  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }
  
    try {
      setIsLoadingSubcategories(true);
      const response = await axios.get(`/api/categories/subcategories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setIsLoadingSubcategories(false);
    }
  };

  
  const closeModal = () => {
    setModalIsOpen(false);
    setShowAddModal(false);
    setEditingCompany(null);
    setNewCompany({
      name: '',
      email: '',
      password: '',
      companyType: '',
      category: '',
      subcategory: [],
      status: 'Active',
      address: '',
      phoneNumber: '',
      website: '',
      description: '',
      socialMedia: { // Initialize socialMedia here
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        telegram: ''
      },
      promotionStartDate: '',
      promotionEndDate: '',
      paymentDetails: {
        paymentMethod: '',
        paymentDate: '',
        paymentAmount: ''
      },
      contactPerson: {
        name: '',
        email: '',
        phoneNumber: ''
      },
      logoUrl: '', // Clear the file input
    });
  };
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />

      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Company Management</h1>
            <div className="mb-4">
            <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search companies..."
            className="form-control mb-3"
          />
        </div>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>Add New Company</Button>
            <table className="min-w-full divide-y divide-gray-200 mt-4">
  <thead>
    <tr>
      <th>Logo</th>
      <th>Name</th>
      <th>Email</th>
      <th>Category</th> 
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
              {currentAnnouncements.map((company) => (
                <tr key={company._id}>
                    <td>
          {company.logoUrl && (
            <img
              src={`/${company.logoUrl}`}
              className="w-10 h-10 object-cover rounded-lg mb-4"
              alt={company.name}
            />
          )}
        </td>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.companyType}</td>
                  <td>{company.status}</td>
                  <td>
                    <button onClick={() => handleEditCompany(company)} className="btn btn-primary btn-sm">
                      Edit
                    </button>
                    <button onClick={() => { setCompanyToDelete(company._id); setDeleteConfirmModal(true); }} className="btn btn-danger btn-sm ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
  </table>

          </div>
        </div>

      {/* Add/Edit Company Modal */}
      <Modal show={showAddModal || modalIsOpen} onHide={closeModal}> 

      {/* <Modal show={showAddModal || modalIsOpen} onHide={() => { setShowAddModal(false); setModalIsOpen(false); }}> */}
        <Modal.Header closeButton>
          <Modal.Title>{editingCompany ? 'Edit Company' : 'Add New Company'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingCompany ? handleUpdateCompany : handleCreateCompany}>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCompany.name}
                onChange={handleInputChange}
                required
              />

            </Form.Group>
            <Form.Group controlId="formCompanyEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newCompany.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCompanyPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  name="password" 
                  value={newCompany.password}
                  onChange={handleInputChange}
                  required={!editingCompany} // Only required when creating a new company
              />
          </Form.Group>
            <Form.Group controlId="formCompanyPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newCompany.password}
                onChange={handleInputChange}
                required={!editingCompany} // Only required when creating a new company
              />
            </Form.Group>

            <Form.Group controlId="formCompanyType">
              <Form.Label>Company Type</Form.Label>
              <Form.Control
                type="text"
                name="companyType"
                value={newCompany.companyType}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCompanyCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newCompany.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCompanySubcategory">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                as="select"
                name="subcategory"
                value={newCompany.subcategory} // Keep the selected subcategory names
                onChange={handleInputChange}
                multiple
              >
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}> {/* Use the subcategory name as the value */}
                    {subcategory}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCompanyStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={newCompany.status}
                onChange={handleInputChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCompanyAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newCompany.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCompanyPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={newCompany.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCompanyWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={newCompany.website}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newCompany.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyLogo">
              <Form.Label>Company Logo</Form.Label>
              <Form.Control
                type="file"
                name="logoUrl"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCompanySocialMedia">
              <Form.Label>Social Media</Form.Label>
              <Form.Control
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                value={newCompany.socialMedia?.facebook || ''} // Optional chaining to handle undefined
                onChange={handleSocialMediaChange}
              />
              <Form.Control
                type="text"
                name="twitter"
                placeholder="Twitter URL"
                value={newCompany.socialMedia?.twitter || ''}
                onChange={handleSocialMediaChange}
              />
              <Form.Control
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={newCompany.socialMedia?.linkedin || ''}
                onChange={handleSocialMediaChange}
              />
              <Form.Control
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                value={newCompany.socialMedia?.instagram || ''}
                onChange={handleSocialMediaChange}
              />
              <Form.Control
                type="text"
                name="telegram"
                placeholder="telegram URL"
                value={newCompany.socialMedia?.telegram || ''}
                onChange={handleSocialMediaChange}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyPromotionStartDate">
              <Form.Label>Promotion Start Date</Form.Label>
              <Form.Control
                type="date"
                name="promotionStartDate"
                value={newCompany.promotionStartDate ? newCompany.promotionStartDate.split('T')[0] : ''}
                // value={newCompany.promotionStartDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyPromotionEndDate">
              <Form.Label>Promotion End Date</Form.Label>
              <Form.Control
                type="date"
                name="promotionEndDate"
                value={newCompany.promotionEndDate ? newCompany.promotionEndDate.split('T')[0] : ''}
                // value={newCompany.promotionEndDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyPaymentDetails">
              <Form.Label>Payment Details</Form.Label>
              <Form.Control
                type="text"
                name="paymentMethod"
                placeholder="Payment Method"
                value={newCompany.paymentDetails?.paymentMethod || ''}
                onChange={handlePaymentDetailsChange}
              />
              <Form.Control
                type="date"
                name="paymentDate"
                placeholder="Payment Date"
                value={newCompany.paymentDate ? newCompany.paymentDate.split('T')[0] : ''}
                // value={newCompany.paymentDetails?.paymentDate || ''}
                onChange={handlePaymentDetailsChange}
              />
              <Form.Control
                type="number"
                name="paymentAmount"
                placeholder="Payment Amount"
                value={newCompany.paymentDetails?.paymentAmount || ''}
                onChange={handlePaymentDetailsChange}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyContactPerson">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="contactPersonName"
                placeholder="Contact Person Name"
                value={newCompany.contactPerson?.name || ''}
                onChange={(e) => handleContactPersonChange(e, 'name')}
              />
              <Form.Control
                type="email"
                name="contactPersonEmail"
                placeholder="Contact Person Email"
                value={newCompany.contactPerson?.email || ''}
                onChange={(e) => handleContactPersonChange(e, 'email')}
              />
              <Form.Control
                type="text"
                name="contactPersonPhone"
                placeholder="Contact Person Phone Number"
                value={newCompany.contactPerson?.phoneNumber || ''}
                onChange={(e) => handleContactPersonChange(e, 'phoneNumber')}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
              {editingCompany ? 'Update Company' : 'Create Company'}
            </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>


      {/* Delete Confirmation Modal */}
      <Modal show={deleteConfirmModal} onHide={() => setDeleteConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this company?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCompany}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
     
      </div>
      <Footer />
      </div>
  );
};

export default Company;


