const jwt = require('jsonwebtoken');
const config = require('./jwt.config');

exports.encode = (data = {}) => {
    return jwt.sign(data, config.jwtSecret);
}

exports.decode = (token = '') => {
    return jwt.verify(token, config.jwtSecret);

}