
class BaseController {

    jsonRes({ res, code, data }) {
        return res.status(code).json(data);
    }
}

module.exports = BaseController;