const appRootPath = require('app-root-path');

const { format } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

module.exports.options = {
    file: {
        level: 'debug',
        filename: `${appRootPath}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        format: format.simple(),
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(
            format.splat(),
            format.simple(),
            colorize(),
            label({ label: 'Future India Pro' }),
            timestamp({ format: 'ddd MMM DD YYYY hh:mm:ss ZZ' }),
            logFormat,
        )
    },
};