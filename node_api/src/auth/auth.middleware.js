const User = require('../user/user.model');
const jwt = require('../modules/jwt/jwt.service');
const fileModel = require('../file/file.model')

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
        let user = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: payload?.id },
            include: [{ model: fileModel, as: "profilePicture" },
            { model: fileModel, as: "coverPicture" }]
        })
        if (!user)
            throw new Error('User not found');
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