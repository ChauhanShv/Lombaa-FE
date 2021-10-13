const BaseController = require("../modules/controller").base;
const model = require('./user.model');

class UserController extends BaseController {
    constructor(...args) {
        super(...args)
    }

    get(req, res, next) {
        return super.jsonRes({ res, code: 200, data: { message: "Hi User" } });
    }
}

module.exports = new UserController();