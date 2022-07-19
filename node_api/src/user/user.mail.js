const mailService = require('../modules/mail').service;
const path = require('path')
const ejs = require('ejs')
const appRoot = require('app-root-path');
exports.startEmailVerificationSequence = async (data) => {
    const filePath = path.join(`${appRoot}/src/email/template/mail.verification.ejs`)
    const htmlData = await ejs.renderFile(filePath, { data })

    mailService.send({
        to: data?.user?.email,
        subject: "Email Verification",
        text: `Email Verification link: ${data.verificationLink}`,
        html: htmlData
    });
};

exports.startForgetPasswordSequence = (data) => {
    mailService.send({
        to: data?.user?.email,
        subject: "Password Reset",
        text: `Reset password link: ${data.resetPasswordLink}`
    });
}