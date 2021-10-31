const userRouter = require('../user').router;

const router = require('../modules/express').instance.Router();

module.exports = () => {
    router.use('/user', userRouter());
    return router;
}