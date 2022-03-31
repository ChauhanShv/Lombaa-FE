const BaseController = require("../modules/controller").base;
const Transaction = require("../transaction/transaction.model");
const User = require("../user/user.model");
class TransactionController extends BaseController {
    getTransaction = async (req, res, next) => {
        try {
            const data = await Transaction.findAll({ include: [{ model: User, as: 'user' }] })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Transaction retreived", data: data } })
        } catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get Transictions", message_details: error?.message } })
        }

    }
}
module.exports = TransactionController