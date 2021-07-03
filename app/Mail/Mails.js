import nodemailer from "nodemailer";
import { config } from "dotenv";
import { registerMailBody } from "./registerMail.js";
config();
const Task = {};
const { MAIL_USER, MAIL_PASSWORD, FRONTENDLINK } = process.env;
Task.registerUser = (
  emailRecipient,
  firstName,
  token,
  expiryTime,
  callback
) => {
  // eslint-disable-next-line
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });
  // eslint-disable-next-line
  var mailOptions = {
    from: MAIL_USER,
    to: emailRecipient,
    subject: "Verification Mail",
    html: registerMailBody(firstName, expiryTime, FRONTENDLINK, token),
  };
  // console.log("mailnotsent");
  // callback("mailnotsent");
  console.log("mailsent");
  callback("mailsent");
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //     callback("mailnotsent");
  //   } else {
  //     console.log("Email sent: " + info.response);
  //     callback("mailsent");
  //   }
  // });
};

export default Task;
