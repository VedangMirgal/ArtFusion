import nodemailer from "nodemailer"

type EmailData = {
  name: string
  email: string
  message: string
}

export async function sendEmail(data: EmailData) {
  const { name, email, message } = data

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    // Send email to site owner
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    // Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Thank you for contacting us",
      text: `
        Dear ${name},
        
        Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.
        
        Best regards,
        Your Company Name
      `,
      html: `
        <h1>Thank you for contacting us</h1>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Your Company Name</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}