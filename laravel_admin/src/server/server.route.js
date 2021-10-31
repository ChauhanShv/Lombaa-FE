const apiRouter = require('../api');
const webRouter = require('../web');

const router = require('../modules/express').instance.Router();

module.exports = () => {
    router.use('/api', apiRouter());
    router.use('/', webRouter());
    return router;
}