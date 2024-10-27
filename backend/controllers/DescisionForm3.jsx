// run server3.js from backend

import React, { useState } from 'react';
import axios from 'axios';
import './DecisionForm3.css'; // Optional CSS file

const DecisionForm = () => {
  const [email, setEmail] = useState('');  // Single email input
  const [showMessageBox, setShowMessageBox] = useState(false); // For showing/hiding message box
  const [customMessage, setCustomMessage] = useState('');      // For handling the custom message
  const [subject, setSubject] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);  // Update for single email
  };

  const handleAccept = () => {
    setSubject('Job Application Status: Accepted');
    setShowMessageBox(true); // Show the message input box when "Accept" is clicked
  };

  const handleReject = async () => {
    setSubject('Job Application Status: Rejected');
    setCustomMessage('We regret to inform you that you have been rejected.'); // Default message for rejection
    await sendEmail(); // Send email immediately for rejection
  };

  const sendEmail = async () => {
    try {
      await axios.post('http://localhost:5000/send-email', {
        email,  // Send the single email to the backend
        subject,
        message: customMessage,  // Use custom message for the email body
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email', error);
    }
  };

  return (
    <div className="decision-form">
      <h2>Send Job Application Decision</h2>

      {/* Input field for single email address */}
      <input
        type="email"
        name="email"
        placeholder="Enter recipient email"
        value={email}
        onChange={handleChange}
        required
      />

      <div className="buttons">
        {/* Accept button reveals the message box */}
        <button onClick={handleAccept}>Accept</button>

        {/* Reject button sends the rejection email immediately */}
        <button onClick={handleReject}>Reject</button>
      </div>

      {/* Show custom message box only when "Accept" is clicked */}
      {showMessageBox && (
        <div className="message-box">
          <textarea
            name="customMessage"
            placeholder="Write your custom message for acceptance"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            required
          />
          <button onClick={sendEmail}>Send Email</button>
        </div>
      )}
    </div>
  );
};

export default DecisionForm;
