import { Navigate } from 'react-router-dom';

// This function checks if the user is authenticated
const isAuthenticated = () => {
  // Check if token exists in localStorage (or sessionStorage)
  return !!localStorage.getItem('token');
};

// ProtectedRoute component to guard private routes
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
