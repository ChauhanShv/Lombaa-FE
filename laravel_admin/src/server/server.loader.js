const helmet = require('helmet');
const morgan = require('morgan');
const log = require('../modules/winston').service;
const cors = require('cors');
const router = require('./server.route');
const appConfig = require('../app').config;
const requestMiddleware = require('../modules/express/request').middleware;
const express = require('../modules/express').instance;

module.exports = ({ app }) => {
    app.use(cors());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev', { stream: log.stream }));
    app.use(requestMiddleware);
    app.use(router());
    app.listen(appConfig.port, error => {
        if (error) {
            log.error("Failed to start server")
            return;
        }
        log.info(`Server is listening on port ${appConfig.port}`);
    })
    return app;
}