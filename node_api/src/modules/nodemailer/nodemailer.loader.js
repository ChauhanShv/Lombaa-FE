const EmailService = require('../services/email');
const log = require('../services/logger');

module.exports = async () => {
    log.info(`Validating Email SMTP server credentials...`);

    try {
        await new EmailService().authenticate();
        log.info(`Valid Email SMTP server credentials found`);
    } catch (error) {
        log.error(`Invalid Email SMTP server credentials found: ${error}`);
    }
};