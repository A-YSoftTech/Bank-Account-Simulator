import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host : 'smtp-relay.brevo.com',
    port : 587,
    secure: false,
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS,
    }
});

transporter.verify((error, success) => {
    if (error) {
      console.error('SMTP Server verification failed:', error);
    } else {
      console.log('SMTP Server is ready to send emails');
    }
  });
export default transporter;