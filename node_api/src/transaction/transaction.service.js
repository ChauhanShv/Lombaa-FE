const Transaction = require("./transaction.model")

class TransactionService {
    constructor() { }
    async insert(status, referenceNumber, amount, currency, userId) {
        try {
            const data = Transaction.create({ status: status, referenceNumber: referenceNumber, amount: amount, currency: currency, userId: userId })
            return data
        }
        catch {
            return null
        }
    }
}
module.exports = TransactionService