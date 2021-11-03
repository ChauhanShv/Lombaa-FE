const jwt = require('../modules/jwt/jwt.service');
const UserService = require('../user/user.service')
const userService = new UserService
module.exports = async (req, res, next) => {
    let headerAccessToken = req.header('x-access-token');
    if (!headerAccessToken) {
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: "Unauthorized access",
                message_detail: "Invalid token. please try again with correct token"
            }
        });
    }
    let appVersion = req.header('x-app-version');
    let currentAppVersion = '1.0.0'
    if (appVersion !== currentAppVersion) {
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: "App version not supported",
                message_detail: "Invalid app version. please try again with correct app version"
            }
        })
    }
    let clientPlatform = req.header('x-client-platform')
    let platforms = ['android', 'ios', 'web']
    if (!platforms.includes(clientPlatform)) {
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: 'Invalid client platform',
                message_detail: "Invalid platfrom. please try again with correct platform"
            }
        })
    }

    try {
        const payload = jwt.decode(headerAccessToken);
        let user = await userService.getUser(payload)
        if (!user)

            throw new Error('User not found');
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: "Unauthorized access",
                message_detail: "Something went wrong"
            }
        });
    }
}