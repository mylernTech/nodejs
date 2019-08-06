const nodemailer = require('nodemailer');

if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = (data) => {
    return new Promise((resolve, reject) => {
        const {name, email, subject, message} = data
    
        const opts = {
            from: `${name} <${email}>`,
            replyTo: email,
            to: process.env.EMAIL_ADDR,
            subject: subject || 'New Message From Website',
            text: message.text || message,
            html: message.html
        }
    
        transport.sendMail(opts, (err) => {
            if (err) {
                return reject(err);
            }
            resolve()
        })
    })
}

module.exports = { sendMail }