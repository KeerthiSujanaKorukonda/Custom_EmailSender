// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DataImportPage from './pages/DataImportPage';
import EmailCustomizationPage from './pages/EmailCustomizationPage';
import DashboardPage from './pages/DashboardPage';
import ESPIntegrationPage from './pages/ESPIntegrationPage';
import Navbar from './pages/Navbar';  // Import the Navbar
import CombinedPage from './pages/CombinedPages';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />  {/* Common Navbar */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/import" element={<DataImportPage />} />
          <Route path="/customize" element={<EmailCustomizationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/comb" element={<CombinedPage  />} / >
          <Route path="/esp" element={<ESPIntegrationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
