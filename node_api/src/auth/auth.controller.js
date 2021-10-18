const BaseController = require("../modules/controller").base;
const AuthService = require('./auth.service');
const jwtService = require('../modules/jwt').service;
const userModel = require('../user/user.model');

const { OAuth2Client } = require('google-auth-library');
const config = require('./auth.config');

const axios = require('axios');

const client = new OAuth2Client(config.googleClientId);
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

    async authenticateGoogle(req, res, next) {
        try {
            this.validationResult(req).formatWith(this.validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }

        try {
            let token = req.body;

            const account = await client.verifyIdToken({
                idToken: token,
                audience: config.googleClientId
            });

            if (!account) {
                const data = {
                    success: false,
                    error: {
                        code: 400401,
                        message: "Invalid google token",
                        messageDetail: "Google token verification failed",
                    }
                }
                return super.jsonRes({ res, code: 400, data });
            }

            const { name, email } = account.getPayload();

            const user = await userModel.upsert({
                where: { email: email },
                update: { name },
                create: {
                    name, email, isGoogleVerified: true,
                }
            });

            const data = {
                success: true,
                message: "User logged in successfully.",
                response: { token: jwtService.encode({ id: user.id }) },
                metadata: { user: user },
            }
            return super.jsonRes({ res, code: 200, data });
        } catch (error) {
            next(error);
        }
    }

    async authenticateFacebook(req, res, next) {
        try {
            this.validationResult(req).formatWith(this.validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }

        try {
            let accessToken = req.body;

            const account = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);

            if (!account) {
                const data = {
                    success: false,
                    error: {
                        code: 400401,
                        message: "Invalid google token",
                        messageDetail: "Google token verification failed",
                    }
                }
                return super.jsonRes({ res, code: 400, data });
            }

            const { name, email } = account;

            const user = await userModel.upsert({
                where: { email: email },
                update: { name },
                create: { name, email, isFacebookVerified: true }
            });

            const data = {
                success: true,
                message: "User logged in successfully.",
                response: { token: jwtService.encode({ id: user.id }) },
                metadata: { user: user },
            }
            return super.jsonRes({ res, code: 200, data });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;