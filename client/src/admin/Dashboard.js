import React from 'react';
import AdminNavbar from './components/AdminNavbar';
import Sidebar from './components/Sidebar';
import AdminFooter from './components/AdminFooter';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <AdminNavbar />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
          
          {/* Dashboard Widgets / Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold">Total Users</h3>
              <p className="text-2xl mt-2">150</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold">Total Sales</h3>
              <p className="text-2xl mt-2">$5,200</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold">New Orders</h3>
              <p className="text-2xl mt-2">45</p>
            </div>
            {/* Add more widgets as needed */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};

export default Dashboard;
