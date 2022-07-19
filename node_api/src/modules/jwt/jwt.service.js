const jwt = require('jsonwebtoken');
const config = require('./jwt.config');

exports.encode = (data = {}, expiresIn) => {
    return jwt.sign(data, config.jwtSecret, { expiresIn: (expiresIn || '1d') });
}

exports.decode = (token = '') => {
    return jwt.verify(token, config.jwtSecret);
}