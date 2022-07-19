const { validationResult } = require('express-validator');
const responseFormatter = require('../formatter').response;
const validationErrorFormatter = require('../formatter').validationErrorFormatter;


class BaseController {
    constructor() {
        this.validationResult = validationResult;
        this.responseFormatter = responseFormatter;
        this.validationErrorFormatter = validationErrorFormatter;
    }

    jsonRes({ res, req, code, data }) {
        if (req?.user && (code === 200 || code === 201)) {
            data.metadata = { user: req.user }
        }
        return res.status(code).json(data);
    }
}

module.exports = BaseController;