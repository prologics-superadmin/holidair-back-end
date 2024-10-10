const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replacing with your SMTP host
  port: 587, // Using the SMTP port
  secure: false, // Use `false` for TLS on port 587
  auth: {
    user: "hasikanchana03@gmail.com", // Your Gmail username
    pass: "olppcfxyupiwepbt", // Your Gmail app password
  },
  tls: {
    rejectUnauthorized: false, // Optional, allows self-signed certificates if needed
  },
});

// async function main() {
//     const info = await transporter.sendMail({
//       from: 'roshangamage@gmail.com', // sender address
//       to: "roshanchamika842@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);

//   }

async function sendMail(receiverAddress, subject, template) {
  try {
    const mailInfo = await transporter.sendMail({
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
