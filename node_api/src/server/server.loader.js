const helmet = require('helmet');
const morgan = require('morgan');
const log = require('../modules/winston').service;
const cors = require('cors');
const router = require('./server.route');
const appConfig = require('../app').config;
const requestMiddleware = require('../modules/express/request').middleware;
const errorMiddleware = require('../modules/express/error').middleware;

const express = require('../modules/express').instance;

module.exports = ({ app }) => {

    const originalSend = app.response.send

    app.response.send = function sendOverWrite(body) {
        originalSend.call(this, body)
        this.__custombody__ = body
    };

    app.use(cors());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    morgan.token('reqbody', (req, res) => JSON.stringify(req.body));
    morgan.token('resbody', (req, res) => JSON.stringify(res.__custombody__));
    app.use(morgan('\n--------------------------------\nHTTP/:http-version :method :url :status :response-time ms\nContent-Length: :req[content-length] byte(s)\n\nReq body: :reqbody\n\nRes body: :resbody\n--------------------------------', { stream: log.stream }));

    app.use(requestMiddleware);
    app.use(errorMiddleware);
    app.use(router());
    app.listen(appConfig.port, error => {
        if (error) {
            log.error(`Failed to start server: \n${error}`);
            return;
        }
        log.info(`Server is listening on port ${appConfig.port}`);
    })
    return app;
}