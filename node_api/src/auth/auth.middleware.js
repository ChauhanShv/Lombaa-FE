const User = require('../user/user.model');
const jwt = require('../modules/jwt/jwt.service');

module.exports = async (req, res, next) => {
    let headerAccessToken = req.header('x-access-token');

    if (!headerAccessToken) {
        return res.status(401).json({
            code: 401,
            message: "Unauthorized access",
        });
    }

    try {
        const payload = jwt.decode(headerAccessToken);
        let user = await User.findByPk(payload?.id);
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