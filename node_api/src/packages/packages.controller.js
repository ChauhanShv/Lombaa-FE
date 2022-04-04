const BaseController = require("../modules/controller").base;
const Package = require("./packages.model")
const Transaction = require("../transaction/transaction.model");
const Order = require("../order/order.model");
const moment = require("moment")
const UserPackageService = require("../user_package/user.package.service");
class PackageController extends BaseController {
    constructor(...args) {
        super(...args)
        this.UserPackageService = new UserPackageService()
    }
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
    activatePackage = async (req, res, next) => {
        try {
            const packageId = req.body?.id
            const categoryId = req.body?.categoryId
            const userId = req.user?.id
            const packageData = await Package.findOne({ where: { id: packageId } })
            const startDate = moment()
            const validity = packageData.validity
            const endDate = moment().add(validity, 'days')
            const userPackage = await this.UserPackageService.insert(startDate, endDate, userId, packageId, categoryId)
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Order received", data: userPackage } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to Order", message_details: error?.message } })
        }
    }
}
module.exports = PackageController