require('dotenv').config();
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email berhasil dikirim!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengirim email', error: error.toString() });
    }
}
