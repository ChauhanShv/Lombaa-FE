const BaseController = require("../modules/controller").base;
const Order = require("./order.model")
const moment = require("moment");
class orderController extends BaseController {
    insertOrder = async (req, res, next) => {
        try {
            const body = req.body
            const userId = req.user?.id
            const data = await Order.create({ date: moment(), itemName: body.itemName, amount: body.amount, currency: body.currency, userId: userId })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "New order record has been created", data: data } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to insert new entry", message_details: error?.message } })
        }
    }
    getOrder = async (req, res, next) => {
        try {
            const data = await Order.findAll()
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Orders retreived", data: data } })
        } catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get Orders", message_details: error?.message } })
        }

    }
}
module.exports = orderController