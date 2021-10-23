const mailService = require('../modules/mail').service;

exports.startEmailVerificationSequence = (data) => {
    mailService.send({
        to: data?.user?.email,
        text: `Registration successful. Verification link: ${data.verificationLink}`
    });
};

exports.startForgetPasswordSequence = (data) => {
    mailService.send({
        to: data?.user?.email,
        text: `Password reset request received. Reset password link: ${data.resetPasswordLink}`
    });
}