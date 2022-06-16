const BaseController = require("../modules/controller").base;
const Order = require("../order/order.model");
const Package = require("../packages/packages.model");
const User = require("../user/user.model");
const UserPackage = require("./user.package.model")
const moment = require('moment')
class userPackageController extends BaseController {

    getUserPackages = async (req, res, next) => {
        try {
            const data = await UserPackage.findAll({ include: [{ model: Package, as: 'package' }, { model: Order, as: 'order' }, { model: User, as: 'user' }] })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Packages retreived", data: data } })
        } catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get packages", message_details: error?.message } })
        }

    }
    updateUserPackage = async (req, res, next) => {
        try {
            const packageId = req.body?.packageId
            const categoryId = req.body?.categoryId
            const userPackageId = req.body?.userPackageId
            const userId = req.user?.id
            const data = await UserPackage.findOne({ where: { id: userPackageId } })
            if (userId !== data?.userId) {
                return super.jsonRes({ res, code: 404, data: { success: false, message: "Something went wrong" } })
            }
            if (data?.startDate === null && moment(data?.endDate) > moment()) {
                const packageData = await Package.findOne({ where: { id: packageId } })
                const startDate = moment()
                const validity = packageData.validity
                const endDate = moment().add(validity, 'days')
                const started = await UserPackage.update({ startDate: startDate, endDate: endDate, categoryId: categoryId }, { where: { id: userPackageId } })
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Package Updated", data: started } })
            }

            return super.jsonRes({ res, code: 200, data: { success: false, message: "Failed to update", } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get packages", message_details: error?.message } })
        }


    }
}
module.exports = userPackageController