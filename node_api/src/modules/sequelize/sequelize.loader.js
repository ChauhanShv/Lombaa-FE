const log = require('../winston').service;
const db = require('./sequelize.service');

module.exports = async () => {
    try {
        await db.authenticate();
    } catch (error) {
        log.error(`Invalid database connection found: ${error}`);
    }
}