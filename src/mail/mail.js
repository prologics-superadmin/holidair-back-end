const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net", // SendGrid SMTP host
  port: 587, // Using TLS on port 587
  secure: false, // Use `false` for TLS
  auth: {
    user: process.env.SENDGRID_USER_NAME, // SendGrid requires "apikey" as the username
    pass: process.env.SENDGRID_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Optional, allows self-signed certificates if needed
  },
});

async function sendMail(
  receiverAddress,
  from = "alert@holidayair.com",
  subject,
  template
) {
  try {
    const mailInfo = await transporter.sendMail({
      from: "alert@holidayair.com",
      to: receiverAddress,
      subject,
      html: template,
    });
  } catch (error) {
    console.error(error);
    throw "Mail sending failed";
  }
}

module.exports = sendMail;
