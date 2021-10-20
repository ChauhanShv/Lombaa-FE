const { validationResult } = require('express-validator');
const responseFormatter = require('../formatter').response;
const validationErrorFormatter = require('../formatter').validationErrorFormatter;


class BaseController {
    constructor() {
        this.validationResult = validationResult;
        this.responseFormatter = responseFormatter;
        this.validationErrorFormatter = validationErrorFormatter;
    }

    jsonRes({ res, code, data }) {
        return res.status(code).json(data);
    }
}

module.exports = BaseController;