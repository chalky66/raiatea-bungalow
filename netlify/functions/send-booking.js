// netlify/functions/send-booking.js
import nodemailer from 'nodemailer'

export default async (request, context) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const bookingData = await request.json()
    
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER, // bungalowtehei@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD // owlp jgcn czmw oycb
      }
    })

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'chalky66@gmail.com',
      subject: bookingData.emailSubject,
      html: `
        <h2>${bookingData.emailSubject}</h2>
        <p><strong>Property:</strong> ${bookingData.property}</p>
        <p><strong>Check-in:</strong> ${bookingData.checkIn}</p>
        <p><strong>Check-out:</strong> ${bookingData.checkOut}</p>
        <p><strong>Guests:</strong> ${bookingData.guests}</p>
        <p><strong>Total:</strong> €${bookingData.total}</p>
        <pre>${bookingData.formattedMessage}</pre>
      `
    }

    await transporter.sendMail(mailOptions)
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}