const BaseController = require("../modules/controller").base;
const Order = require("../order/order.model");
const Package = require("../packages/packages.model");
const User = require("../user/user.model");
const UserPackage = require("./user.package.model")
const moment = require('moment');
const Category = require("../category/category.model");
class userPackageController extends BaseController {

    getUserPackages = async (req, res, next) => {
        try {
            let data = await UserPackage.findAll({ include: [{ model: Package, as: 'package' }, { model: User, as: 'user', attributes: ['name'] }, { model: Category, as: "category", attributes: ["name"] }] })
            data.map(data => {
                this.statusUpdate(data)
            })
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
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Package has been started", data: started } })
            }

            return super.jsonRes({ res, code: 404, data: { success: false, message: "Package has been expired", } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to apply pacakge", message_details: error?.message } })
        }


    }
    statusUpdate = (data) => {
        if (data.startDate === null && data.endDate === null) {
            return data.status = 'queued'
        }
        else if (moment(data?.endDate) < moment()) {
            return data.status = 'expired'
        }
        else {
            return data.status = 'activated'
        }
    }
}
module.exports = userPackageController