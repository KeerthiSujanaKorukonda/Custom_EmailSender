import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Papa from 'papaparse';

const apiKey = "YOUR_GOOGLE_GENERATIVE_AI_API_KEY";
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

const CombinedPage = () => {
  const location = useLocation();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isContentGenerating, setIsContentGenerating] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  // Email Customization logic
  const handleGenerateContent = async () => {
    setIsContentGenerating(true);
    try {
      const content = await generateContent(prompt);
      setGeneratedContent(content);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsContentGenerating(false);
    }
  };

  const handleSendEmails = async () => {
    setIsSending(true);
    try {
      // Implement your email sending logic here.
      console.log("Emails sent:", selectedEmails);
    } catch (error) {
      console.error("Error sending emails:", error);
    } finally {
      setIsSending(false);
    }
  };

  // CSV Parsing logic
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
  };

  const handleParseCSV = () => {
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        complete: (result) => {
          setParsedData(result.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  return (
    <div className="container">
      <h1>Email Customization and Data Import</h1>

      {/* Email Customization Section */}
      <section>
        <h2>Email Customization</h2>
        <textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerateContent} disabled={isContentGenerating}>
          {isContentGenerating ? 'Generating...' : 'Generate Content'}
        </button>
        <div>
          <h3>Generated Content:</h3>
          <p>{generatedContent}</p>
        </div>
        <button onClick={handleSendEmails} disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Emails'}
        </button>
      </section>

      {/* Data Import Section */}
      <section>
        <h2>Data Import</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleParseCSV}>Parse CSV</button>
        <div>
          <h3>Parsed Data:</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
};

export default CombinedPage;
