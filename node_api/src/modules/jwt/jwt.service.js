const jwt = require('jsonwebtoken');
const config = require('./jwt.config');
const log = require('../winston').service;

exports.encode = (data = {}) => {
    return jwt.sign(data, config.jwtSecret);
}

exports.decode = (token = '') => {
    try {
        let data = jwt.verify(token, config.jwtSecret);
        return { error: null, data };
    } catch (error) {
        log.debug(error);
        return { error: error };
    }
}