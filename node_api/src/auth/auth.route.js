const router = require('../modules/express').instance.Router();
const AuthController = require('./auth.controller');
const { schema, googleSchema } = require('./data_schema');
const { checkSchema } = require('express-validator');

const controller = new AuthController();


module.exports = () => {
    router.post('/', checkSchema(schema), (req, res, next) => controller.authenticate(req, res, next));
    router.post('/google', checkSchema(googleSchema), (req, res, next) => controller.authenticateGoogle(req, res, next));
    router.post('/facebook', checkSchema(googleSchema), (req, res, next) => controller.authenticateFacebook(req, res, next));

    return router;
}