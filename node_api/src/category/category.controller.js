const BaseController = require("../modules/controller").base;
const categoryModel = require('./category.model')
const fileModel = require('../file/file.model')

class CategoryController extends BaseController {
    constructor() {
        super();
    }
    async Categories(req, res, next) {
        try {
            const data = await categoryModel.findAll({ include: [{ model: fileModel, as: "icon" }] })
            const value = {
                success: true,
                code: 200,
                message: "Site attributes list fetched successfully",
                response: data
            }
            return super.jsonRes({ res, code: 200, data: value })
        }
        catch (error) {
            console.log(error)
            return super.jsonRes({ res, code: 401, message: 'bye' })
        }

    }
    async add(req, res, next) {
        try {
            const data = req.body
            const value = await categoryModel.create(data)
            const value1 = await value.save()
            return super.jsonRes({ res, code: 200, message: 'hii' })
        }
        catch {
            return super.jsonRes({ res, code: 401, message: "bye" })
        }
    }
}

module.exports = CategoryController