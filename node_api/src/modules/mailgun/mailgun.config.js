module.exports = {
    apiKey: process.env.MAILGUN_API_KEY || '',
    username: process.env.MAILGUN_USERNAME || 'mg_user',
    domain: process.env.MAILGUN_DOMAIN || 'sandbox_user.mailgun.com'
};