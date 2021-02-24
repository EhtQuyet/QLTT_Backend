import nodemailer from 'nodemailer';
import { getConfig } from '../../config/config';
const config = getConfig(process.env.NODE_ENV);

export function sendEmail(mailOptions) {
  try {
    let transporter = nodemailer.createTransport(config.mail);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log(error)
        // callback(error);
      } else {
        // callback(undefined, info);
      }
    });
  }
  catch (e){
    console.log(e)
  }
}
