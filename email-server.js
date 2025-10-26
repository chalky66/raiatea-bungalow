import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load email configuration
const configPath = path.join(__dirname, 'email-config.json');
let emailConfig;

try {
  emailConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('Error loading email config:', error);
  process.exit(1);
}

// Create SMTP transporter
const transporter = nodemailer.createTransporter({
  host: emailConfig.smtp.host,
  port: emailConfig.smtp.port,
  secure: emailConfig.smtp.secure,
  auth: {
    user: emailConfig.smtp.auth.user,
    pass: emailConfig.smtp.auth.pass
  }
});

// Email sending endpoint
app.post('/api/send-booking', async (req, res) => {
  try {
    const {
      property,
      checkIn,
      checkOut,
      guests,
      nights,
      subtotal,
      serviceFee,
      taxes,
      extrasTotal,
      selectedExtras,
      total,
      timestamp,
      language,
      emailSubject,
      formattedMessage
    } = req.body;

    const mailOptions = {
      from: emailConfig.emailSettings.from,
      to: emailConfig.emailSettings.to,
      subject: emailSubject || emailConfig.emailSettings.subject,
      html: `
        <h2>${emailSubject}</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h3>Booking Details:</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Property:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${property}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-in:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${checkIn}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-out:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${checkOut}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Guests:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${guests}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nights:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${nights}</td></tr>
          </table>
          
          <h3>Pricing Breakdown:</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Accommodation:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">€${subtotal}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service Fee:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">€${serviceFee}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Taxes:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">€${taxes}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Extras:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">€${extrasTotal}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Selected Extras:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${selectedExtras}</td></tr>
            <tr style="background-color: #f5f5f5;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Total:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><strong>€${total}</strong></td></tr>
          </table>
          
          <p><strong>Submitted:</strong> ${timestamp}</p>
          <p><strong>Language:</strong> ${language}</p>
          
          <hr>
          <div style="margin-top: 20px;">
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${formattedMessage}</pre>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    res.json({ 
      success: true, 
      message: 'Booking email sent successfully',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send booking email',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});