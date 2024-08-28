import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../image/logo.png';

const Footer = ({ isFixed }) => {
  return (
    <footer
      className={`bg-gray-900 text-white py-10 ${
        isFixed ? 'fixed bottom-0 left-0 right-0 z-10' : ''
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div>
        <img src={logo} alt="logo" className="w-60 h-30 mr-0" />
        <br/>
          <h3 className="text-lg font-bold mb-3">About Us</h3>
          <p className="text-gray-400 text-sm">
            Z-Group Company specializes in company registration and promotion
            services, helping businesses establish their presence in the market
            with ease and efficiency.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="text-gray-400 text-sm">
            <li className="mb-2">
              <a
                href="/about"
                className="hover:text-white no-underline transition duration-300 ease-in-out transform hover:scale-105"
              >
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/services"
                className="hover:text-white no-underline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Services
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/contact"
                className="hover:text-white no-underline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Contact
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/privacy"
                className="hover:text-white no-underline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-white no-underline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Info</h3>
          <p className="text-gray-400 text-sm">Email: info@zgroup.com</p>
          <p className="text-gray-400 text-sm">Phone: +251-935-964 964</p>
          <p className="text-gray-400 text-sm mb-4">
            Address: 123 Z-Group Street, Addis Ababa, Ethiopia
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 Z-Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
