import nodemailer from "nodemailer";
import { client_mail, client_password } from "../../config";


const mailer = async (otp, emailId) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: client_mail,
      pass: client_password,
    },
  });

  let mailOptions = {
    from: client_mail,
    to: emailId,
    subject: "Test OTP",
    html: `<b> Enter your OTP within 5 minutes: ${otp} </b>`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error from nodemailer ", error);
    } else {
      console.log("Email Sent: ", info.response);
    }
  });
};


export default mailer;