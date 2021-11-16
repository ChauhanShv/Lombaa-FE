const BaseController = require("../modules/controller").base;
const Category = require('./category.model')
const File = require('../file/file.model')
const Field = require('../field/field.model');
const FieldValue = require('../field_value/field_value.model')

class CategoryController extends BaseController {
    constructor() {
        super();
    }
    async categories(req, res, next) {
        try {
            const data = await Category.findAll({
                include: [
                    { model: File, as: "icon" },
                    {
                        model: Category,
                        as: 'subCategories',
                    },
                    {
                        model: Field,
                        as: 'fields',
                        include: [{ model: FieldValue, as: 'values' }]
                    }
                ]
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
            console.log(error);
            const value = { success: false, message: 'Failed to retrieve categories', messageDetail: error?.message }
            return super.jsonRes({ res, code: 400, data: value });
        }

    }
    async add(req, res, next) {
        try {
            const data = req.body
            const value = await Category.create(data)
            const value1 = await value.save()
            return super.jsonRes({ res, code: 200, message: 'hii' })
        }
        catch {
            return super.jsonRes({ res, code: 400, message: "bye" })
        }
    }
}

module.exports = CategoryController