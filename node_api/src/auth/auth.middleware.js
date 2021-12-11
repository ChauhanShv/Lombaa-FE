const jwt = require('../modules/jwt/jwt.service');
const UserService = require('../user/user.service')
const config = require('../app/app.config')
const eventEmitter = require('../user/user.subscriber');
const event = require('../user/user.event');

const userService = new UserService();

module.exports = async (req, res, next) => {
    let headerAccessToken = req.header('x-access-token');
    if (!headerAccessToken) {
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: "Unauthorized access",
                message_detail: "Token is invalid"
            }
        });
    }
    let clientPlatform = req.header('x-client-platform')
    let platforms = ['Android', 'Ios', 'Web']
    if (!platforms.includes(clientPlatform)) {
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: 'Platform is not supported',
                message_detail: "Platform is not available"
            }
        })
    }
    if (clientPlatform !== 'Web') {
        let appVersion = req.header('x-app-version');
        let currentAppVersion = config.appVersion
        if (appVersion !== currentAppVersion) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 401,
                    message: "App version not supported",
                    message_detail: `App version is incompatible. Current supported version is ${config.appVersion}`
                }
            })
        }
    }
    try {
        const payload = jwt.decode(headerAccessToken);
        let user = await userService.getUser(payload)
        if (!user)

            throw new Error('User not found');
        req.user = user;
        next();
        eventEmitter.emit(event.apiAccessed, (user) => { userService?.updateLastActiveTime(user) }, user);
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            error: {
                code: 401,
                message: "Unauthorized access",
                message_detail: err.message
            }
        });
    }
}