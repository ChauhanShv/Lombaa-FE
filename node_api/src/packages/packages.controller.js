const BaseController = require("../modules/controller").base;
const Package = require("./packages.model")
const Transaction = require("../transaction/transaction.model")
class PackageController extends BaseController {
    getPackages = async (req, res, next) => {
        try {
            const data = await Package.findAll()
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Packages retreived", data: data } })
        } catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get packages", message_details: error?.message } })
        }

    }
    getById = async (req, res, next) => {
        try {
            const id = req?.params?.id
            const data = await Package.findOne({ where: { id: id } })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Packages retreived by id", data: data } })

        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get packages", message_details: error?.message } })
        }
    }
}
module.exports = PackageController