const jwt = require('jsonwebtoken');
const secret = require('../config/jwt').TOKEN_SECRET;
const log = require('../services/logger');

exports.encode = ({ data = {} }) => {
    return jwt.sign(data, secret);
}

exports.decode = ({ token = '' }) => {
    try {
        let data = jwt.verify(token, secret);
        return { error: null, data };
    } catch (error) {
        log.debug(error);
        return { error: error };
    }
}