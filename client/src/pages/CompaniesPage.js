import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import React, { useEffect, useState, useRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import Register from '../image/register-now.png';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(9);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
        try {
            const response = await axios.get('/api/companies');
            setCompanies(response.data);
            setFilteredCompanies(response.data); // Initialize filteredCompanies with all companies
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Network error');
        } finally {
            setLoading(false);
        }
    };

    fetchCompanies();
}, []);

useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    fetchCategories();
}, []);

// Fetch subcategories whenever the selected category changes
useEffect(() => {
    if (selectedCategory) {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get(
                    `/api/subcategories?category=${selectedCategory}`
                );
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories', error);
            }
        };

        fetchSubcategories();
    } else {
        setSubcategories([]); // Clear subcategories if no category is selected
    }
}, [selectedCategory]);

useEffect(() => {
    // Filter companies based on search query, category, and subcategory
    const filtered = companies.filter((company) => {
        const matchesSearch = !searchQuery || 
            (company.name && company.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = !selectedCategory || company.category === selectedCategory;

        const matchesSubcategory = !selectedSubcategory || company.subcategory.includes(selectedSubcategory);

        return matchesSearch && matchesCategory && matchesSubcategory; 
    });

    setFilteredCompanies(filtered);
}, [searchQuery, selectedCategory, selectedSubcategory, companies]);


  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSubcategoryChange = (e) => setSelectedSubcategory(e.target.value);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowModal = (company) => {
    setSelectedCompany(company); // Set selectedCompany first
    setShowModal(true); // Then show the modal
  };

  const handleCloseModal = () => setShowModal(false);

  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const footerPosition = footerRef.current?.offsetTop;

    if (footerPosition && scrollPosition >= footerPosition) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <div className="relative h-60">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://png.pngtree.com/thumb_back/fw800/background/20220217/pngtree-simple-atmosphere-black-line-promotion-background-image_954276.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="text-4xl font-bold text-white relative z-10 flex justify-center items-center h-full font-poppins">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              COMPANIES
            </motion.div>
          </h1>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-opacity-20 bg-blue-500 rounded-full w-40 h-40 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Search and Filters */}
      <div className="md:hidden p-4">
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search companies..."
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white p-2 rounded w-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
            <ul className="border rounded p-2 mt-2">
              <li
                onClick={() => setSelectedCategory('')}
                className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                  selectedCategory === '' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                All Categories
              </li>
              {categories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                    selectedCategory === category.name
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                >
                  {category.name}
                </li>
              ))}
            </ul>

            {/* Subcategory Filter */}
            {subcategories.length > 0 && (
              <ul className="border rounded p-2 mt-4">
                <li
                  onClick={() => setSelectedSubcategory('')}
                  className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                    selectedSubcategory === '' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  All Subcategories
                </li>
                {subcategories.map((subcategory) => (
                  <li
                    key={subcategory._id}
                    onClick={() => setSelectedSubcategory(subcategory.name)}
                    className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                      selectedSubcategory === subcategory.name
                        ? 'bg-blue-500 text-white'
                        : ''
                    }`}
                  >
                    {subcategory.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 flex flex-wrap">
        {/* Sidebar for larger screens */}
        <div className="hidden md:block md:w-1/4 md:pr-6 mb-4 md:mb-0">
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search companies..."
              className="border p-2 rounded w-full"
            />
          </div>
          <ul className="border rounded p-2">
            <li
              onClick={() => setSelectedCategory('')}
              className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                selectedCategory === '' ? 'bg-blue-500 text-white' : ''
              }`}
            >
              All Categories
            </li>
            {categories.map((category) => (
              <li
                key={category._id}
                onClick={() => setSelectedCategory(category.name)}
                className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                  selectedCategory === category.name ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>

          {/* Subcategory Filter */}
          {subcategories.length > 0 && (
            <ul className="border rounded p-2 mt-4">
              <li
                onClick={() => setSelectedSubcategory('')}
                className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                  selectedSubcategory === '' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                All Subcategories
              </li>
              {subcategories.map((subcategory) => (
                <li
                  key={subcategory._id}
                  onClick={() => setSelectedSubcategory(subcategory.name)}
                  className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                    selectedSubcategory === subcategory.name
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                >
                  {subcategory.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Company Cards */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCompanies.map((company) => (
                        <motion.div
                            key={company._id}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleShowModal(company)}
                        >
                            {/* Check if logoUrl exists and is not empty before rendering the image */}
                            {company.logoUrl && (
                                <div className="flex justify-center">
                                    <img
                                        src={`/${company.logoUrl}`}
                                        alt={company.name || 'Company Logo'}
                                        className="w-24 h-24 object-cover rounded-full mb-4"
                                    />
                                </div>
                            )}
                            <h2 className="text-xl font-bold text-center">
                                {company.name || 'Unnamed Company'}
                            </h2>
                            <p className="text-gray-600 text-center mt-2">
                                {company.description || 'No description available'}
                            </p>
                            <div className="flex justify-center mt-4">
                                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                                <span className="ml-2 text-green-500">
                                    {company.status === 'Active' ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(filteredCompanies.length / companiesPerPage) },
            (_, i) => (
              <li key={i}>
                <button
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Company Details Modal */}
      <Modal show={showModal && selectedCompany !== null} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedCompany?.name}</Modal.Title> 
    </Modal.Header>
    <Modal.Body>
    {selectedCompany && ( // Conditionally render the content
  <>
    <img
      src={`/${selectedCompany.logoUrl}`}
      className="w-full h-48 object-cover rounded-lg mb-4"
      alt={selectedCompany.name || 'Company Logo'}
    />
    <p><strong>Category:</strong> {selectedCompany?.category || 'N/A'}</p>
    <p><strong>Subcategory:</strong> {selectedCompany?.subcategory?.join(', ') || 'N/A'}</p>
    <p><strong>Description:</strong> {selectedCompany?.description || 'No description available'}</p>
    <p><strong>Phone Number:</strong> {selectedCompany?.phoneNumber || 'N/A'}</p>
    <p>
  <strong>Website:</strong>{" "}
  {selectedCompany?.website ? (
    <a
      href={selectedCompany.website}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {selectedCompany.website}
    </a>
  ) : (
    'N/A'
  )}
</p>
    <p><strong>Status:</strong> {selectedCompany?.status || 'N/A'}</p>
    <p><strong>Tax ID:</strong> {selectedCompany?.taxId || 'N/A'}</p>
    <p><strong>Business License:</strong> {selectedCompany?.businessLicense || 'N/A'}</p>
{/*     
    <h3 className="mt-4 font-semibold">Promotion Details</h3>
    <p><strong>Promotion Start Date:</strong> {selectedCompany?.promotionStartDate ? new Date(selectedCompany.promotionStartDate).toLocaleDateString() : 'N/A'}</p>
    <p><strong>Promotion End Date:</strong> {selectedCompany?.promotionEndDate ? new Date(selectedCompany.promotionEndDate).toLocaleDateString() : 'N/A'}</p>
    <p><strong>Promotion Details:</strong> {selectedCompany?.promotionDetails || 'N/A'}</p>
     */}
    {/* <h3 className="mt-4 font-semibold">Payment Details</h3>
    <p><strong>Payment Method:</strong> {selectedCompany?.paymentDetails?.paymentMethod || 'N/A'}</p>
    <p><strong>Payment Date:</strong> {selectedCompany?.paymentDetails?.paymentDate ? new Date(selectedCompany.paymentDetails.paymentDate).toLocaleDateString() : 'N/A'}</p>
    <p><strong>Payment Amount:</strong> {selectedCompany?.paymentDetails?.paymentAmount ? `$${selectedCompany.paymentDetails.paymentAmount}` : 'N/A'}</p>
    <p><strong>Payment Status:</strong> {selectedCompany?.paymentStatus ? 'Paid' : 'Unpaid'}</p> */}
    
    <h3 className="mt-4 font-semibold">Social Media Links</h3>
<p>
  <strong>Facebook:</strong>{" "}
  {selectedCompany?.socialMedia?.facebook ? (
    <a
      href={selectedCompany.socialMedia.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {selectedCompany.socialMedia.facebook}
    </a>
  ) : (
    'N/A'
  )}
</p>
<p>
  <strong>Twitter:</strong>{" "}
  {selectedCompany?.socialMedia?.twitter ? (
    <a
      href={selectedCompany.socialMedia.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {selectedCompany.socialMedia.twitter}
    </a>
  ) : (
    'N/A'
  )}
</p>
<p>
  <strong>LinkedIn:</strong>{" "}
  {selectedCompany?.socialMedia?.linkedin ? (
    <a
      href={selectedCompany.socialMedia.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {selectedCompany.socialMedia.linkedin}
    </a>
  ) : (
    'N/A'
  )}
</p>
<p>
  <strong>Instagram:</strong>{" "}
  {selectedCompany?.socialMedia?.instagram ? (
    <a
      href={selectedCompany.socialMedia.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {selectedCompany.socialMedia.instagram}
    </a>
  ) : (
    'N/A'
  )}
</p>

    
    <h3 className="mt-4 font-semibold">Contact Person</h3>
    <p><strong>Name:</strong> {selectedCompany?.contactPerson?.name || 'N/A'}</p>
    <p><strong>Email:</strong> {selectedCompany?.contactPerson?.email || 'N/A'}</p>
    <p><strong>Phone Number:</strong> {selectedCompany?.contactPerson?.phoneNumber || 'N/A'}</p>
  </>
)}

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default CompaniesPage;
