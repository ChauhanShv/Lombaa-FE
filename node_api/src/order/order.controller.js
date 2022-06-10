const BaseController = require("../modules/controller").base;
const Order = require("./order.model")
const moment = require("moment");
const User = require("../user/user.model");
const Package = require("../packages/packages.model");
const Invoice = require("../invoice/invoice.model")
class orderController extends BaseController {
    insertOrder = async (req, res, next) => {
        try {
            const body = req.body?.package
            const userId = req.user?.id
            const packageData = await Package.findOne({ where: { id: body } })
            const data = await Order.create({ date: moment(), itemName: packageData.name, unitPrice: packageData.price, currency: packageData.currency, qty: 1, userId: userId })
            const invoiceNumber = await Invoice.findOne({ order: [['createdAt', 'DESC']] })

            const number = Number(invoiceNumber?.invoiceNumber ?? 100000) + 1
            const invoice = await Invoice.create({ orderId: data.id, invoiceNumber: number })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "New order record has been created", order: data, invoice: invoice } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to insert new entry", message_details: error?.message } })
        }
    }
    getOrder = async (req, res, next) => {
        try {
            const data = await Order.findAll({ include: [{ model: User, as: 'user' }] })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Orders retreived", data: data } })
        } catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get Orders", message_details: error?.message } })
        }

    }
}
module.exports = orderController