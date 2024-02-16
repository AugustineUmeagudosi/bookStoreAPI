/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const options = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: './src/utils/mailServices/templates', // path to email templates are saved
    layoutsDir: '',
    defaultLayout: '',
  },
  viewPath: './app/utils/mailServices/templates', // path to email templates are saved
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  service: 'Mailjet',
  port: process.env.MAIL_PORT,
  pool: true,
  rateLimit: 20,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  // use the following lines if you are testing the endpoint offline
  tls: { rejectUnauthorized: false },
});
transporter.use('compile', hbs(options));

// email sender
const sendMail = (recipient, subject, template, data) => {
  if (process.env.NODE_ENV === 'test') return;

  const mailOptions = {
    from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
    to: recipient,
    replyTo: process.env.MAIL_FROM_ADDRESS,
    subject,
    template,
    context: data,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return logger.error(error.code);
    logger.info(JSON.stringify(info));
  });
};

const data = { LOGO: process.env.LOGO };

export const sendForgotPasswordEmail = (email, name, token) => {
  data.url = `${process.env.FRONTEND_BASE_URL}/reset-password/${token}`;
  data.name = name;
  data.year = new Date().getFullYear();

  const subject = 'Password reset code for Laygoswatercraf';
  const template = 'forgotPassword'; // name of template file
  sendMail(email, subject, template, data);
};
