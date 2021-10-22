const BaseController = require("../modules/controller").base;
const model = require('./user.model');
const util = require('./user.util');
const { validationResult } = require('express-validator');
const validationErrorFormatter = require('../modules/formatter').validationErrorFormatter;
const responseFormatter = require('../modules/formatter').response;
const jwtService = require('../modules/jwt').service;
const UserService = require('./user.service');

class UserController extends BaseController {

    constructor() {
        super();
        this.service = new UserService();
    }

    get(req, res, next) {
        return super.jsonRes({ res, code: 200, data: model.findAll() });
    }

    async create(req, res, next) {

        try {
            validationResult(req).formatWith(validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }

        const body = req.body;

        const userData = {
            businessName: body?.businessName,
            name: body?.name,
            email: body?.email,
            phoneNumber: body?.phoneNumber,
            accountType: body?.accountType,
            tinNumber: body?.tinNumber,
            password: util?.hashPassword(body.password),
        };

        try {
            const newUser = await model.create(userData);
            const token = jwtService.encode({ id: newUser.id });
            const data = {
                success: true,
                message: "User created successfully.",
                response: { token },
                metadata: { user: newUser },
            }
            super.jsonRes({ res, code: 200, data: responseFormatter.format(data) });
        } catch (err) {
            next(err);
        }
    }

    async setPassword(req, res, next) {
        try {
            validationResult(req).formatWith(validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }

        try {
            const user = req.user;
            const { password } = req.body;
            const updateUser = await this.service.setPassword(user.id, password);
            super.jsonRes({
                res,
                code: 201,
                data: {
                    success: true,
                    message: "Password changed",
                    metadata: { user: updateUser },
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;