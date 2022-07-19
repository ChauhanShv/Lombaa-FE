const BaseController = require("../modules/controller").base;
const categoryModel = require('./category.model')
const fileModel = require('../file/file.model')

class CategoryController extends BaseController {
    constructor() {
        super();
    }
    async Categories(req, res, next) {
        try {
            const data = await categoryModel.findAll({
                include: [
                    { model: fileModel, as: "icon" },
                    {
                        model: categoryModel,
                        as: 'subCategories',
                    }]
            })
            const value = {
                success: true,
                code: 200,
                message: "Site attributes list fetched successfully",
                response: data
            }
            return super.jsonRes({ res, code: 200, data: value })
        }
        catch (error) {
            const value = { success: false, message: 'Failed to retrieve categories', messageDetail: error?.message }
            return super.jsonRes({ res, code: 400, data: value });
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
            return super.jsonRes({ res, code: 400, message: "bye" })
        }
    }
}

module.exports = CategoryController