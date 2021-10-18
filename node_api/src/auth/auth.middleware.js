// const User = require('../user').model;
const jwt = require('../modules/jwt').service;

module.exports = async (req, res, next) => {
    let headerAccessToken = req.header('x-access-token');

    if (headerAccessToken == undefined || headerAccessToken == null) {
        return res.status(401).json({
            code: 401,
            message: "Unauthorized access",
        });
    }

    try {
        const id = jwt.decode(token);
        let user = User.findByPk(id);
        if (!user)
            throw new Error('user not found');
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            code: 401,
            message: "Unauthorized access",
        });
    }
}