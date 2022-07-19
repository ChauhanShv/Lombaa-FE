const mailgunService = require('../mailgun').service;
const config = require('./mail.config');

exports.send = async ({ from = config.from, to, subject, text, html, attachment }) => {
    mailgunService.create({ from, to, subject, text, html, attachment });
}