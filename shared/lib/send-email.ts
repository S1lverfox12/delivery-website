
import { render } from '@react-email/render';
import { Transporter } from 'nodemailer';
console.log("Зашли в send-email");
let transporter: Transporter | undefined;
if (typeof window === 'undefined') {
    transporter = require('@/app/api/sendmail').default;
}

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
    console.log("Зашли в sendEmail");
    const html = await render(template as JSX.Element);
    const mailOptions = {
        from: process.env.MAIL_USER, // Ваш адрес отправителя
        to,
        subject,
        html,
    };

    try {
        if (transporter) {
            const info = await transporter.sendMail(mailOptions);
            return info;
        } else {
            throw new Error('Transpoter is not available in the client-side environment.');
        }
    } catch (error) {
        throw error;
    }
};
