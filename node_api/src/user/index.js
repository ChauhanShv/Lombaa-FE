const router = require('./user.route');
const controller = require('./user.controller');
const model = require('./user.model');
const service = require('./user.service');
const filesModel = require('./model.files')

module.exports = { router, controller, model, service, filesModel };