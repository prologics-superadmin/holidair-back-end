const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "",
    pass: "",
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
