const config = require('./sequelize.config');
const Sequelize = require('sequelize');
const log = require('../winston').service;

module.exports = new Sequelize(
    config.name,
    config.user,
    config.password,
    {
        dialect: 'mysql',
        host: config.host,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        logging: (query) => { log.debug(`Executing query: ${query}`); }
    },
)