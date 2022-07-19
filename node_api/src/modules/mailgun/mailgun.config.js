module.exports = {
    apiKey: process.env.MAILGUN_API_KEY || '',
    username: process.env.MAILGUN_USERNAME || 'mg_user',
    domain: process.env.MAILGUN_DOMAIN || 'sandbox_user.mailgun.com',
    publicKey: process.env.MAILGUN_PUBLIC_KEY || 'pubkey-8e94fc69daf8923ac298e4694f01e9f4'
};