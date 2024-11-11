import React from 'react';

const ESPIntegrationPage = () => {
  return (
    <div className="min-h-screen bg-[#a0e7e5] p-5 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8 animate__animated animate__fadeIn">
          Connect to Email Service Provider (ESP)
        </h1>

        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 shadow-lg">
            Connect SendGrid
          </button>

          <button className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 shadow-lg">
            Connect Mailgun
          </button>

          <button className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 shadow-lg">
            Connect Amazon SES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESPIntegrationPage;
