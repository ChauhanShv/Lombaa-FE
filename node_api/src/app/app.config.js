module.exports = {
    port: process.env.APP_PORT || 3000,
    version: process.env.APP_VERSION || 1,
    name: process.env.APP_NAME || 'DT Next',
    timeZone: process.env.APP_TIMEZONE || 'Asia/Kolkata',
    utcOffset: process.env.APP_UTC_OFFSET || 330,
};