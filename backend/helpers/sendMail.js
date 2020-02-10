const nodemailer = require("nodemailer");
const { MAILGUN_EMAIL, MAILGUN_PASSWORD } = process.env;

function sendMail(to, subject, message) {
  return new Promise((resolve, reject) => {
    const smtpTransport = nodemailer.createTransport({
      port: 587,
      host: "smtp.eu.mailgun.org",
      secure: false,
      auth: {
        user: MAILGUN_EMAIL,
        pass: MAILGUN_PASSWORD
      }
    });
    const mailOptions = {
      to,
      from: "postmaster@mg.chadify.me",
      subject,
      text: message
    };
    smtpTransport.sendMail(mailOptions, function(err) {
      if (err) {
        return reject();
      }
      resolve();
    });
  });
}

module.exports = sendMail;
