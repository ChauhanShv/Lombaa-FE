const service = require('./auth.service');
const controller = require('./auth.controller');
const middleware = require('./auth.middleware');
const router = require('./auth.route');


module.exports = { router, service, controller, middleware };