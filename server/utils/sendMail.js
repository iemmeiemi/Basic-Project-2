'use strict';
const nodemailer = require('nodemailer');

const sendMail = async ({ email, html }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_NAME,
            pass:   process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"BASIC PROJECT 2 👻" <no-reply@nguyenlinhshop.com>', // sender address
        to: email, // list of receivers
        subject: 'Forgot password', // Subject line
        text: 'Hello world?', // plain text body
        html: html // html body
    });
    return info;
};

module.exports = sendMail;
