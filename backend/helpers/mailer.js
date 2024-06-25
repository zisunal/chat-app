const mailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
    const transporter = mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.APP_PASSWORD,
        },
    });

    const message = {
        from: `${process.env.APP_NAME} <${process.env.MAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    }

    await transporter.sendMail(message);
};

module.exports = sendEmail;