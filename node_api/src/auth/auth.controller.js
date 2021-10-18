const BaseController = require("../modules/controller").base;
const AuthService = require('./auth.service');
const jwtService = require('../modules/jwt').service;
class AuthController extends BaseController {

    constructor() {
        super();
        this.service = new AuthService();
    }

    async authenticate(req, res, next) {
        try {
            this.validationResult(req).formatWith(this.validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }

        try {
            let user = req.body;

            const authUser = await this.service.doAuth({ email: user.email, password: user.password });
            if (authUser) {
                const data = {
                    success: true,
                    message: "User logged in successfully.",
                    response: { token: jwtService.encode({ id: authUser.id }) },
                    metadata: { user: authUser },
                }
                super.jsonRes({ res, code: 200, data });
            }
            else {
                const data = {
                    success: false,
                    error: {
                        "code": 4002,
                        message: "Login Failed",
                        messageDetail: "Email & Password combination is incorrect.",
                    }
                }
                super.jsonRes({ res, code: 400, data });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;