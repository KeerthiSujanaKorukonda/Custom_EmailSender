const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Replace with your Gmail address', // Your Gmail address
        pass: 'Replace with your Gmail app password' // Your Gmail app password
    }
});

// Email sending route
app.post('/send-emails', (req, res) => {
    const { recipients, subject, text } = req.body;

    if (!recipients || recipients.length === 0) {
        return res.status(400).json({ message: 'No recipients provided.' });
    }

    // Email options
    const mailOptions = {
        from: 'Replace with your Gmail address',
        to: recipients.join(','), // Convert the array to a comma-separated string
        subject: subject || 'No Subject', // Optional fallback
        text: text || 'No content', // Optional fallback
    };

    // Send emails
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending emails.' });
        } else {
            console.log('Emails sent: ' + info.response);
            return res.status(200).json({ message: 'Emails sent successfully.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
