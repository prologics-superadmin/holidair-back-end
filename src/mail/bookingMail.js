const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net", // SendGrid SMTP host
  port: 587, // Using TLS on port 587
  secure: false, // Use `false` for TLS
  auth: {
    user: "apikey", // SendGrid requires "apikey" as the username
    pass: "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", // Replace with your actual SendGrid API Key
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
