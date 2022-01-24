"use strict";
const nodemailer = require("nodemailer");

const SettingModel = require(__path_models + 'settings');

const sendMail = async (to, subject, htmlContent) => {
    const settings = await SettingModel.getItem();

    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: settings.email,
            pass: settings.password,
        },
    });
    let message = {
        from: settings.email,
        to,
        envelope: {
            from: `${settings.email} <${settings.email}>`, // used as MAIL FROM: address for SMTP
            to, // used as RCPT TO: address for SMTP
        },
        subject, // Tiêu đề của mail
        html: htmlContent,
    }
    return transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail,
}