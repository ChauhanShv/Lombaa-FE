const router = require('../modules/express').instance.Router();
const UserController = require('./user.controller');
const schema = require('./user.data-schema');
const { setPassword: setPasswordSchema } = require('./schema');
const authMiddleware = require('../auth/auth.middleware');

const { checkSchema } = require('express-validator');

const controller = new UserController();


module.exports = () => {
    router.post('/', checkSchema(schema), (req, res, next) => controller.create(req, res, next));
    router.put('/password', authMiddleware, checkSchema(setPasswordSchema), (req, res, next) => controller.setPassword(req, res, next));
    return router;
}
