const UserPackage = require("./user.package.model")

class UserPackageService {
    constructor() { }
    async insert(startDate, endDate, userId, packageId, categoryId) {
        try {
            const data = UserPackage.create({ startDate: startDate, endDate: endDate, userId: userId, packageId: packageId, categoryId: categoryId })
            return data
        }
        catch {
            return null
        }
    }
}
module.exports = UserPackageService