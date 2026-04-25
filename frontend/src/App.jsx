import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import DashboardLayout from './components/DashboardLayout';
import ConsumerLayout from './components/ConsumerLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import ComparisonPage from './pages/ComparisonPage';

import MedicineDetails from './pages/MedicineDetails';
import SavedWatchlist from './pages/SavedWatchlist';
import MedicineCompare from './pages/MedicineCompare';

import UserProfile from './pages/UserProfile';
import PharmacyDashboard from './pages/PharmacyDashboard';
import PharmacyInsights from './pages/PharmacyInsights';

import AddMedicineForm from './pages/AddMedicineForm';
import InquiryRequests from './pages/InquiryRequests';
import ErrorEmptyStates from './pages/ErrorEmptyStates';
import ClinicalAnalytics from './pages/ClinicalAnalytics';
import InventoryManagement from './pages/InventoryManagement';
import PharmacySettings from './pages/PharmacySettings';

import InventoryFlow from './pages/InventoryFlow';
import PharmacyDetail from './pages/PharmacyDetail';
import OrderHistory from './pages/OrderHistory';
import SettingsPage from './pages/SettingsPage';
import RealTimeMonitor from './pages/RealTimeMonitor';
import ClinicianPortal from './pages/ClinicianPortal';
import AdminOversight from './pages/AdminOversight';
import NotificationsPage from './pages/NotificationsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Lenis from 'lenis';
import 'react-toastify/dist/ReactToastify.css';
import GlobalWidgets from './components/GlobalWidgets';

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <ToastContainer position="bottom-right" theme="dark" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>

        <Route path="/" element={<ConsumerLayout />}>
          <Route path="saved-watchlist" element={<SavedWatchlist />} />
          <Route path="/medicine-details" element={<MedicineDetails />} />
          <Route path="medicine-compare" element={<MedicineCompare />} />
          <Route path="compare" element={<MedicineCompare />} />
          <Route path="price-comparison" element={<ComparisonPage />} />
          <Route path="pharmacies" element={<PharmacyInsights />} />
          <Route path="pharmacies/:id" element={<PharmacyDetail />} />
        </Route>

        <Route path="error-states" element={<ErrorEmptyStates />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="analytics" element={<ClinicalAnalytics />} />
          <Route path="add-medicine" element={<AddMedicineForm />} />
          <Route path="inquiries" element={<InquiryRequests />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="pharmacy-dashboard" element={<PharmacyDashboard />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="settings" element={<PharmacySettings />} />
          <Route path="monitor" element={<RealTimeMonitor />} />
          <Route path="clinician" element={<ClinicianPortal />} />
          <Route path="admin" element={<AdminOversight />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        <Route path="*" element={<ErrorEmptyStates />} />
      </Routes>
      <GlobalWidgets />
    </Router>
  );
}

export default App;
