const config = require('./mailgun.config');

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData).client({ username: config.username, key: config.apiKey, public_key: config.publicKey });

exports.create = (data) => {
    console.log({ data, domain: config.domain, username: config.username, key: config.apiKey, publicKey: config.publicKey });
    mailgun.messages.create(config.domain, data).then().catch(e => console.log(e));
};