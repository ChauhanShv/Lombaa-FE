const BaseController = require("../modules/controller").base;
const Package = require("./packages.model")
const Transaction = require("../transaction/transaction.model");
const Order = require("../order/order.model");
const moment = require("moment")
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
    buyPackage = async (req, res, next) => {
        try {
            const userId = req.user?.id
            const packageId = req.body?.id
            const packageData = await Package.findOne({ where: { id: packageId } })
            const data = await Order.create({ date: moment(), itemName: packageData.name, amount: packageData.price, currency: packageData.currency, userId: userId })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Order received", data: data } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to Order", message_details: error?.message } })
        }
    }
}
module.exports = PackageController