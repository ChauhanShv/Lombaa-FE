const service = require('./auth.service');
const controller = require('./auth.controller');
const middleware = require('./auth.middleware');

module.exports = { service, controller, middleware };