const config = require('./mailgun.config');

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData).client({ username: config.username, key: config.apiKey, public_key: config.publicKey });

exports.create = (data) => {
    mailgun.messages.create(config.domain, data).then().catch(e => console.log(e));
};