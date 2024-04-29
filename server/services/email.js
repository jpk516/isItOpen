const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

const sendMail = async (to, subject, text, html) => {
    let res = await transporter.sendMail({
        from: process.env.EMAIL_ACCOUNT,
        to: to,
        subject: subject,
        text: text,
        html: html
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

const sendPasswordReset = async (to, token) => {
    let subject = 'Password Reset Request';
    let text = `A password reset request was made for your account. If you did not make this request, please ignore this email. Otherwise, click the link below to reset your password. This link will expire in 1 hour.`;
    let html = `<p>${text}</p><a href="${process.env.CLIENT_URL_PROD}/reset-password/${to}/${token}">Reset Password</a>`;
    await sendMail(to, subject, text, html);
}

module.exports = {
    sendMail,
    sendPasswordReset
}