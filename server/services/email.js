const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
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

    console.log("Message sent: %s", res.messageId);
}

module.exports = {
    sendMail
}