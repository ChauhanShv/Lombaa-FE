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
                this.getUserPackageStatus(data)
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
            const userPackage = await UserPackage.findOne({ where: { id: userPackageId } })
            if (userId !== userPackage?.userId) {
                return super.jsonRes({ res, code: 404, data: { success: false, message: "Something went wrong" } })
            }

            const userPackages = await UserPackage.findAll({ where: { userId: userId, categoryId: categoryId } })
            const activeUserPackage = userPackages.find(singlePackage => {
                const data = this.getUserPackageStatus(singlePackage)
                if (data === 'expired') {
                    return false
                }
                return true
            })

            if (activeUserPackage) {
                return super.jsonRes({ res, code: 404, data: { success: false, message: "Package for selected category is already active", } })
            }

            switch (this.getUserPackageStatus(userPackage)) {
                case "activated":
                    return super.jsonRes({ res, code: 404, data: { success: false, message: "Package is already active", } })

                case "expired":
                    return super.jsonRes({ res, code: 404, data: { success: false, message: "Package has been expired", } })
            }
            const packageData = await Package.findOne({ where: { id: userPackage.packageId } })
            const startDate = moment()
            const validity = packageData.validity
            const endDate = moment().add(validity, 'days')
            await UserPackage.update({ startDate: startDate, endDate: endDate, categoryId: categoryId }, { where: { id: userPackageId } })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Package has been started" } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to apply pacakge", message_details: error?.message } })
        }


    }
    getUserPackageStatus = (userPackage) => {
        if (userPackage.startDate === null && userPackage.endDate === null) {
            return userPackage.status = 'queued'
        }
        else if (moment(userPackage?.endDate) < moment()) {
            return userPackage.status = 'expired'
        }
        else {
            return userPackage.status = 'activated'
        }
    }
}
module.exports = userPackageController