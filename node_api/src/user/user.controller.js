const BaseController = require("../modules/controller").base;
const model = require('./user.model');
const util = require('./user.util');
const { validationResult } = require('express-validator');
const validationErrorFormatter = require('../modules/formatter').validationErrorFormatter;
const responseFormatter = require('../modules/formatter').response;
const jwtService = require('../modules/jwt').service;


class UserController extends BaseController {

    constructor() {
        super()
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
            businessName: body.businessName,
            name: body?.name,
            email: body?.email,
            phoneNumber: body?.phoneNumber,
            accountType: body?.accountType,
            tinNumber: body?.tinNumber,
            password: util?.hashPassword(body.password),
        };

        try {
            const newUser = await model.create(userData);
            const token = jwtService.encode({ id: user.id });
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
}

module.exports = UserController;