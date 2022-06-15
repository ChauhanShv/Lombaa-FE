const BaseController = require("../modules/controller").base;
const User = require("../user/user.model")
const Package = require("../packages/packages.model");
const Invoice = require("./invoice.model")
const MerchantBank = require("../merchant_bank/merchant.bank.model")
const MerchantAddress = require("../merchant_address/merchant.address.model")

class invoiceController extends BaseController {

    getInvoice = async (req, res, next) => {
        try {
            const id = req.params?.id
            const userId = req.user?.id
            const data = await Invoice.findOne({ where: { id: id }, include: [{ model: User, as: 'user', attributes: ['name'] }, { model: Package, as: 'package' }] })
            const merchantBank = await MerchantBank.findOne();

            const merchantAddress = await MerchantAddress.findOne();
            if (userId !== data.userId) {
                return super.jsonRes({ res, code: 404, data: { success: false, message: "Invoice not found" } })
            }
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Invoice retreived", data: { data, merchantAddress, merchantBank } } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: true, message: "failed to retreived invoice", message_details: error?.message } })
        }
    }
    insertInvoice = async (req, res, next) => {
        try {
            const id = req.body?.packageId
            const userId = req.user?.id
            const packageData = await Package.findOne({ where: { id: id } })
            const invoiceNumber = await Invoice.findOne({ order: [['createdAt', 'DESC']] })
            const number = `${(Number(invoiceNumber?.invoiceNumber ?? 0) + 1)}`.padStart(7, '0');
            const invoiceData = await Invoice.create({ invoiceNumber: number, packageName: packageData.name, packageDescription: packageData.description, price: packageData.price, userId: userId, packageId: id })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Invoice Inserted", data: invoiceData } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: true, message: "failed to insert invoice", message_details: error?.message } })
        }

    }
}
module.exports = invoiceController