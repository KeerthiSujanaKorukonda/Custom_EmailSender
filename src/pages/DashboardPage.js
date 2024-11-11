import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const DashboardPage = () => {
  // Pie chart data for each metric
  const chartData = (data, remainingData, colors) => ({
    labels: ['Metric', 'Remaining'],
    datasets: [
      {
        data: [data, remainingData],
        backgroundColor: colors,
        hoverBackgroundColor: colors.map(color => `${color}CC`), // Slightly darker on hover
      },
    ],
  });

  // Total Categories Pie Chart (aggregating data)
  const totalCategoriesData = {
    labels: ['Sent', 'Pending', 'Failed', 'Response Rate'],
    datasets: [
      {
        data: [75, 10, 3, 45], // Example values (in percentage)
        backgroundColor: ['#FF5733', '#FF9800', '#F44336', '#3A87D5'], // Updated colors for total categories
        hoverBackgroundColor: ['#FF4500', '#FF8C00', '#E53935', '#1E88E5'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#a0e7e5] p-5">
      <h1 className="text-4xl font-semibold mb-5 text-center text-white animate__animated animate__fadeIn">
        Email Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Total Emails Sent</h2>
          <p className="text-3xl text-green-600">1500</p>
          <div className="w-24 h-24 mt-3">
            <Pie data={chartData(75, 25, ['#34D399', '#E0E0E0'])} options={{ responsive: true }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Emails Pending</h2>
          <p className="text-3xl text-orange-600">200</p>
          <div className="w-24 h-24 mt-3">
            <Pie data={chartData(10, 90, ['#FF9800', '#E0E0E0'])} options={{ responsive: true }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Emails Failed</h2>
          <p className="text-3xl text-red-600">50</p>
          <div className="w-24 h-24 mt-3">
            <Pie data={chartData(3, 97, ['#F44336', '#E0E0E0'])} options={{ responsive: true }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Response Rate</h2>
          <p className="text-3xl text-blue-600">45%</p>
          <div className="w-24 h-24 mt-3">
            <Pie data={chartData(45, 55, ['#3A87D5', '#E0E0E0'])} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Additional Pie Charts (Optional) */}
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Engagement Rate</h2>
          <p className="text-3xl text-purple-600">60%</p>
          <div className="w-24 h-24 mt-3">
            <Pie data={chartData(60, 40, ['#9B4D96', '#E0E0E0'])} options={{ responsive: true }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Open Rate</h2>
          <p className="text-3xl text-teal-600">35%</p>
          <div className="w-24 h-24 mt-3">
            <Pie data={chartData(35, 65, ['#26C6DA', '#E0E0E0'])} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Total Categories Pie Chart */}
      <div className="mt-10 bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Total Categories</h2>
        <div className="w-48 h-48 mt-3">
          <Pie data={totalCategoriesData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
