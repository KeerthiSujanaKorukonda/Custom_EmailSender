// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-around">
        <Link to="/" className="text-xl font-semibold hover:text-yellow-500">Home</Link>
        <Link to="/import" className="text-xl font-semibold hover:text-yellow-500">Import Data</Link>
        <Link to="/customize" className="text-xl font-semibold hover:text-yellow-500">Customize Email</Link>
        <Link to="/dashboard" className="text-xl font-semibold hover:text-yellow-500">Dashboard</Link>
        <Link to="/esp" className="text-xl font-semibold hover:text-yellow-500">ESP Integration</Link>
      </div>
    </nav>
  );
};

export default Navbar;
