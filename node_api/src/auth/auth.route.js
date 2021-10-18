const router = require('../modules/express').instance.Router();
const AuthController = require('./auth.controller');
const schema = require('./auth.data-schema');
const { checkSchema } = require('express-validator');

const controller = new AuthController();


module.exports = () => {
    router.post('/', checkSchema(schema), (req, res, next) => controller.authenticate(req, res, next));
    return router;
}