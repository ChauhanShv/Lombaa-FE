const { transports, createLogger } = require("winston");
const config = require('./winston.config');

const logger = createLogger({
    transports: [
        new transports.File(config.options.file),
        new transports.Console(config.options.console),
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;