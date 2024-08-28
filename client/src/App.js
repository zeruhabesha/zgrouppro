import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
// import LoadingSpinner from './admin/components/LoadingSpinner';


const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CompaniesPage = lazy(() => import('./pages/CompaniesPage'));
const PromotionsPage = lazy(() => import('./pages/PromotionsPage'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const Admin = lazy(() => import('./admin/Admin'));
const Catagory = lazy(() => import('./admin/Catagory'));
const Company = lazy(() => import('./admin/Company'));
const Promotion = lazy(() => import('./admin/Promotion'));
const Payment = lazy(() => import('./admin/Payment'));
const Report = lazy(() => import('./admin/Report'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/dashboard/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/dashboard/category" element={<ProtectedRoute element={<Catagory />} />} />
          <Route path="/dashboard/company" element={<ProtectedRoute element={<Company />} />} />
          <Route path="/dashboard/promotion" element={<ProtectedRoute element={<Promotion />} />} />
          <Route path="/dashboard/payment" element={<ProtectedRoute element={<Payment />} />} />
          <Route path="/dashboard/report" element={<ProtectedRoute element={<Report />} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
