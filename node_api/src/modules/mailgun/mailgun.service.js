const config = require('./mailgun.config');

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData).client({ username: 'api', key: config.apiKey });

exports.create = (data) => {
    mailgun.messages.create(config.domain, data);
};