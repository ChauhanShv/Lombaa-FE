const BaseController = require("../modules/controller").base;
const Order = require("../order/order.model");
const Package = require("../packages/packages.model");
const User = require("../user/user.model");
const UserPackage = require("./user.package.model")
class userPackageController extends BaseController {

    getUserPackages = async (req, res, next) => {
        try {
            const data = await UserPackage.findAll({ include: [{ model: Package, as: 'package' }, { model: Order, as: 'order' }, { model: User, as: 'user' }] })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Packages retreived", data: data } })
        } catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get packages", message_details: error?.message } })
        }

    }
}
module.exports = userPackageController