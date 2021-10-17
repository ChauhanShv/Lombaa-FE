const router = require('../modules/express').instance.Router();
const UserController = require('./user.controller');
const schema = require('./user.data-schema');
const { checkSchema } = require('express-validator');

const controller = new UserController();


module.exports = () => {
    router.get('/', controller.get);
    router.post('/', checkSchema(schema), (req, res, next) => controller.create(req, res, next));

    return router;
}