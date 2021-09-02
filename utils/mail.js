const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (name, email, code) => {
    let subject = "ICT Fest Participation";
    let to = email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hi ${name}<p><br><p>Here is your unique code: <br><bold>${code}</bold></p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;
    let mailData = { to, from, subject, html };

    return new Promise((resolve, reject) => {
    transport.sendMail(mailData, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });

}

module.exports = { sendMail };
