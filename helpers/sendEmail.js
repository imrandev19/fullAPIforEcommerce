const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const sendOtp = require("./sendOTP");
async function sendEmail(email, otp, name) {

  const COMPANY_EMAIL = process.env.COMPANY_EMAIL;
  const EMAIL_PASSKEY = process.env.EMAIL_PASSKEY;
  const transporter = nodemailer.createTransport({
    service: "Gmail",

    auth: {
      user: COMPANY_EMAIL,
      pass: EMAIL_PASSKEY,
    },
  });
   // Read and compile the template
   const source = fs.readFileSync(path.join(__dirname, "template.hbs"), "utf8");
   const template = handlebars.compile(source);
   
   // Dynamic data
   const replacements = {
     name: name,
     code: otp,
     year: new Date().getFullYear()
   };
   const htmlToSend = template(replacements);
  const info = await transporter.sendMail({
    from: COMPANY_EMAIL,
    to: email,
    subject: "Email Verification",
    html: htmlToSend,
  });
}
module.exports = sendEmail;
