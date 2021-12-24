const mailService = require('../modules/mail').service;

exports.startEmailVerificationSequence = (data) => {
    mailService.send({
        to: data?.user?.email,
        subject: "Email Verification",
        text: `Email Verification link: ${data.verificationLink}`
    });
};

exports.startForgetPasswordSequence = (data) => {
    mailService.send({
        to: data?.user?.email,
        subject: "Password Reset",
        text: `Reset password link: ${data.resetPasswordLink}`
    });
}