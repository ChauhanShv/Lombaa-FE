const userRouter = require('../user').router;
const authRouter = require('../auth').router;

const router = require('../modules/express').instance.Router();

module.exports = () => {
    router.use('/user', userRouter());
    router.use('/auth', authRouter());

    return router;
}