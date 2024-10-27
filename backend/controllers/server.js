const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Email sending route
app.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;  // Receive single email

    // Create transport using nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,  // Single email
        subject: subject,
        text: message
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        res.status(200).send({ success: true, message: 'Email sent', info });
    } catch (error) {
        console.error('Error sending email: ', error);  // Log the detailed error
        res.status(500).send({ success: false, message: 'Error sending email', error });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
