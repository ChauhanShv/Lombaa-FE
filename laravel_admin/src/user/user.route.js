const router = require('../modules/express').instance.Router();
const userController = require('./user.controller');

module.exports = () => {
    router.get('/', userController.get);
    return router;
}