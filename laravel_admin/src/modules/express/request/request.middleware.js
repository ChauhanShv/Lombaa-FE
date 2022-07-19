const { service: log } = require('../../winston');

module.exports = (req, res, next) => {
    // console.log(`Request Body:`, req.body);
    console.log(`${req.method}: ${req.url}`, req.body);
    next();
}