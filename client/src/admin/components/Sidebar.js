import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <button
        className="lg:hidden text-black p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:w-64 lg:transform-none`}
      >
        <ul className="space-y-6 p-4"> {/* Reduces vertical space between list items */}
          <li>
            <Link
              to="/dashboard"
              className="block px-4 py-2 no-underline text-white hover:bg-black transition-colors duration-300"
              onClick={toggleSidebar}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin"
              className="block px-4 py-2 no-underline text-white hover:bg-black transition-colors duration-300"
              onClick={toggleSidebar}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/category"
              className="block px-4 py-2 no-underline text-white hover:bg-black transition-colors duration-300"
              onClick={toggleSidebar}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/company"
              className="block px-4 py-2 no-underline text-white hover:bg-black transition-colors duration-300"
              onClick={toggleSidebar}
            >
              Companies
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/promotion"
              className="block px-4 py-2 no-underline text-white hover:bg-black transition-colors duration-300"
              onClick={toggleSidebar}
            >
              Promotion
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 no-underline text-white hover:bg-black transition-colors duration-300"
              onClick={toggleSidebar}
            >
              Payment
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 no-underline text-white hover:bg-black transition-colors duration-300"
              onClick={toggleSidebar}
            >
              Report
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
