const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = async (to, subject, text, html) => {
  const mailOptions = {
    from: {
      name: "Homesol",
      address: process.env.GMAIL_USER,
    },
    to,
    subject,
    text,
    html,
  };
  try {
    transporter.sendMail(mailOptions);
    console.log("Email has been sent successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
