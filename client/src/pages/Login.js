import { useState } from 'react';
import { motion } from 'framer-motion'; // For animation
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const errors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      setLoading(true); // Set loading state to true

      try {
        // Make API request
        const response = await axios.post('/api/admins/login', { email, password });

        // Handle successful response (e.g., store token, redirect user)
        console.log(response.data);

        // Store token in localStorage or sessionStorage (based on your preference)
        localStorage.setItem('token', response.data.token);

        // Redirect to the dashboard
        navigate('/dashboard');
        
        // Clear form fields
        setEmail('');
        setPassword('');
      } catch (error) {
        // Handle error response
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors || { general: 'An error occurred' });
        } else {
          setErrors({ general: 'An error occurred' });
        }
      } finally {
        setLoading(false); // Set loading state to false
      }
    }
  };

  return (
    <div>
        <Navbar/>
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <motion.h1
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Login
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </motion.div>

          {errors.general && <p className="text-red-500 text-sm mt-4 text-center">{errors.general}</p>}

          <motion.button
            type="submit"
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
    <Footer />
        </div>
  );
};

export default Login;
