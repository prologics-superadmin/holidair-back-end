const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net", // SendGrid SMTP host
  port: 587, // Using TLS on port 587
  secure: false, // Use `false` for TLS
  auth: {
    user: process.env.SENDGRID_USER_NAME,
    pass: process.env.SENDGRID_PASSWORD, // Replace with your actual SendGrid API Key
  },
  tls: {
    rejectUnauthorized: false, // Optional, allows self-signed certificates if needed
  },
});

async function sendBookingMail(
  receiverAddress,
  from = "alert@holidayair.com",
  subject,
  template
) {
  try {
    const mailInfo = await transporter.sendMail({
      from: "onlinebooking@holidayair.com",
      to: receiverAddress,
      subject,
      html: template,
    });
  } catch (error) {
    console.error(error);
    throw "Mail sending failed";
  }
}
module.exports = sendBookingMail;
