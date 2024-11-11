import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the custom CSS for animations

const LandingPage = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000); // Reset after 1 second
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${clicked ? 'bg-crackers' : ''}`}
      style={{ backgroundColor: '#387478' }}
    >
      <div className="text-center space-y-6">
        {/* Navigation Headings at the top */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-opacity-75 bg-gray-800 text-white flex justify-around">
          <Link to="/" className="text-xl font-semibold hover:text-yellow-500">Home</Link>
          <Link to="/import" className="text-xl font-semibold hover:text-yellow-500">Import Data</Link>
          <Link to="/customize" className="text-xl font-semibold hover:text-yellow-500">Customize Email</Link>
          <Link to="/dashboard" className="text-xl font-semibold hover:text-yellow-500">Dashboard</Link>
          <Link to="/esp" className="text-xl font-semibold hover:text-yellow-500">ESP Integration</Link>
        </div>

        {/* Main content */}
        <div className="mt-16">
          <h1 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Welcome to the Email Campaign App
          </h1>
          <p className="text-xl text-white mb-5 max-w-xl mx-auto">
            Automate your email campaigns and personalize messages at scale, bringing your marketing efforts to the next level.
          </p>
        </div>

        {/* "Get Started" Button */}
        <div className="mt-12">
          <Link
            to="/import"
            onClick={handleClick}
            className="px-8 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-400 transform hover:scale-105 transition-all ease-in-out duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
