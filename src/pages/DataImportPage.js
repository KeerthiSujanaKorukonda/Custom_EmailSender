import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaFileCsv } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DataImportPage = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [emailData, setEmailData] = useState([]);
  const [showDataOverlay, setShowDataOverlay] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 20000) {
      setStatus('File size exceeds 20 KB. Please upload a smaller file.');
      return;
    }

    setFile(file);
    setStatus('Processing file...');
    setIsLoading(true);
    processFile(file);
  };

  const processFile = (file) => {
    if (file.name.endsWith('.csv')) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const csvData = fileReader.result
          .split('\n')
          .map((row) => row.split(',').map((cell) => cell.trim()));
        setEmailData(csvData);
        setStatus('File processed successfully.');
        setIsLoading(false);
        console.log("CSV Data:", csvData); // Log the parsed CSV data
      };
      fileReader.readAsText(file);
    } else {
      setStatus('Invalid file format. Please upload a CSV file.');
      setIsLoading(false);
    }
  };

  const handleViewData = () => {
    setShowDataOverlay(true);
    console.log("Displaying Data Overlay..."); // Log when overlay is triggered
  };

  const handleCloseOverlay = () => {
    setShowDataOverlay(false);
    console.log("Overlay closed, but selection retained."); // Log when overlay is closed but selection is not cleared
  };

  const handleSelectRow = (index) => {
    const updatedSelection = [...selectedRows];
    if (updatedSelection.includes(index)) {
      updatedSelection.splice(updatedSelection.indexOf(index), 1); // Remove row from selected
      console.log(`Row ${index + 1} deselected`); // Log deselecting a row
    } else {
      updatedSelection.push(index); // Add row to selected
      console.log(`Row ${index + 1} selected`); // Log selecting a row
    }
    setSelectedRows(updatedSelection);
    console.log("Updated selected rows:", updatedSelection); // Log the current selected rows
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Unselect all rows
      console.log("Unselecting all rows.");
    } else {
      setSelectedRows(emailData.slice(1).map((_, index) => index)); // Select all rows
      console.log("Selecting all rows.");
    }
    setSelectAll(!selectAll);
  };

  const handleCustomizeEmails = () => {
    const selectedEmails = selectedRows.map((index) => emailData[index + 1][0]);
    console.log("Selected Emails:", selectedEmails); // Log selected emails for customization
    
    if (selectedEmails.length > 0) {
        // Navigate to the 'customize' page and pass selectedEmails using the state
        console.log("Navigating to customize page with selected emails."); // Log before navigation
        navigate('/customize', { state: { selectedEmails } });
    } else {
        // If no emails are selected, you can show a warning or handle it accordingly.
        console.log("No emails selected for customization."); // Log when no emails are selected
        alert('Please select at least one email to customize.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#a0e7e9] p-5">
      <h1 className="text-3xl font-semibold mb-5">Upload CSV or Connect Google Sheets</h1>
      <p className="mb-5 text-gray-600">Upload a .csv file or Google Sheets containing only email addresses, size less than 20 KB.</p>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-5 p-2 border border-gray-300 rounded text-gray-700"
      />
      {file && (
        <div className="flex items-center space-x-2 mb-3">
          <FaFileCsv className="text-xl text-gray-600" />
          <span className="text-sm text-gray-600">{file.name}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center space-x-2">
          <AiOutlineUpload className="animate-spin text-2xl text-blue-500" />
          <p className="text-yellow-500">{status}</p>
        </div>
      ) : (
        <p className={`text-sm ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
      )}

      <div className="flex space-x-4 mt-5">
        <button
          disabled={!emailData.length}
          onClick={handleViewData}
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg ${!emailData.length ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          View Data
        </button>

        <button
          onClick={handleCustomizeEmails}
          className={`px-6 py-2 rounded-lg text-white ${selectedRows.length ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'}`}
        >
          Customize Email
        </button>
      </div>

      {showDataOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6 relative">
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Selected Email Data</h2>
            <div className="overflow-y-auto max-h-96">
              <table className="table-auto w-full border-collapse border border-gray-300 shadow-sm">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border border-gray-300 p-2 text-left">S.No.</th>
                    <th className="border border-gray-300 p-2 text-left">Email</th>
                    <th className="border border-gray-300 p-2 text-left">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="form-checkbox h-5 w-5 text-green-600"
                      /> Select All
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emailData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-100 transition-colors">
                      <td className="border border-gray-300 p-2 text-center">{rowIndex + 1}</td>
                      <td className="border border-gray-300 p-2">{row[0]}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(rowIndex)}
                          onChange={() => handleSelectRow(rowIndex)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCloseOverlay}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataImportPage;
