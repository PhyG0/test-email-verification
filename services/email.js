import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD  
  }
});

const sendVerificationMail = (toMail, userID, username) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: toMail,
        subject: 'Z-Chat Gmail Verification',
        html: `
            <h1>${username}, Click here to verify your Z-Chat gmail account <a href='http://localhost:5500/auth/${userID}'>Verify</a></h1>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

export default sendVerificationMail;