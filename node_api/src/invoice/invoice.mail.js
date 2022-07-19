const mailService = require('../modules/mail').service;
exports.sendPdf = async (data) => {
    mailService.send({
        to: data?.user?.email,
        subject: "Email",
        text: "Welcome",
        html: data.html,
        attachment: data.attachments
    });
};
