import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "Replace with your API key";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const generationConfig = {
  temperature: 0.7,
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

async function generateContent(prompt) {
  try {
    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

const EmailCustomizationPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Using useNavigate for navigation
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isContentGenerating, setIsContentGenerating] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // Ensure that the selectedEmails are passed correctly from the previous page
  useEffect(() => {
    if (location.state && location.state.selectedEmails) {
      const emails = location.state.selectedEmails;
      setSelectedEmails(emails);
      console.log("Passed Emails:", emails); // Log the emails for debugging
    } else {
      setSelectedEmails([]); // Default to empty array if not passed
    }
  }, [location.state]);

  const handleChange = (e) => setPrompt(e.target.value);

  const handleGenerateContent = async () => {
    setIsContentGenerating(true);
    try {
      const content = await generateContent(prompt);
      setGeneratedContent(content);
    } catch (error) {
      alert("Error generating email content. Please try again.");
    } finally {
      setIsContentGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    console.log("Sending emails to:", selectedEmails, "with content:", generatedContent);
  
    try {
      const response = await fetch('http://localhost:3001/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: selectedEmails,
          subject: 'Customized Email Content',
          text: generatedContent,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setShowSuccessOverlay(true); // Show success overlay on successful email sending
        console.log('Emails sent successfully:', result);
      } else {
        alert('Error sending emails: ' + result.message);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails. Please try again.');
    } finally {
      setIsSending(false);
    }
  };
  
  const handleCloseOverlay = () => {
    setShowSuccessOverlay(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#a0e7e5] p-5">
      <h1 className="text-3xl font-semibold mb-5">Customize Email Content</h1>

      <textarea
        value={prompt}
        onChange={handleChange}
        placeholder="Enter your email prompt with placeholders (e.g., {Company Name})"
        className="p-4 border border-gray-300 rounded-lg w-1/2 h-40 mb-5"
      />

      <motion.button
        onClick={handleGenerateContent}
        className={`px-6 py-2 bg-green-500 text-white rounded-lg ${isContentGenerating ? 'cursor-wait' : ''}`}
        disabled={isContentGenerating}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {isContentGenerating ? 'Generating Content...' : 'Generate Content'}
      </motion.button>

      {generatedContent && (
        <div className="mt-5 w-1/2 p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Generated Email Content</h3>
          <p>{generatedContent}</p>
        </div>
      )}

      {/* Display selected emails */}
      {selectedEmails.length > 0 && (
        <div className="mt-5 w-1/2 p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Emails to be Sent:</h3>
          <ul>
            {selectedEmails.map((email, index) => (
              <li key={index} className="text-gray-700">{email}</li>
            ))}
          </ul>
        </div>
      )}

      <motion.button
        onClick={handleSendEmail}
        className={`px-6 py-2 bg-blue-500 text-white rounded-lg mt-5 ${isSending || !generatedContent ? 'cursor-wait' : ''}`}
        disabled={isSending || !generatedContent}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {isSending ? 'Sending...' : 'Send Emails'}
      </motion.button>

      {isSending && (
        <div className="mt-5 w-1/2 bg-gray-200 h-2 rounded-full">
          <motion.div
            className="bg-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3 }}
          />
        </div>
      )}

      {showSuccessOverlay && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-2xl w-80 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <button
              onClick={handleCloseOverlay}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg font-semibold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center text-green-600">Success!</h3>
            <p className="text-center text-gray-700">Emails sent successfully!</p>
            <motion.button
              onClick={handleCloseOverlay}
              className="w-full mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EmailCustomizationPage;
