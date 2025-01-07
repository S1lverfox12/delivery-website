import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER, // Ваш SMTP логин
        pass: process.env.MAIL_PASSWORD, // Ваш SMTP пароль
    },
});

export default transporter;