import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.nodemailer_user,
      pass: config.nodemailer_app_password,
    },
  });

  await transporter.sendMail({
    from: config.nodemailer_user, // sender address
    to, // list of receivers
    subject: 'Reset your password within ten minutes!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
