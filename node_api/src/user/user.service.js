const util = require('./user.util');
const userModel = require('./user.model');

module.exports = class UserService {
    constructor() {
    }

    async verifyPassword(userId, password) {
        let user = await userModel.findByPk(userId);
        const passwordMatch = await bcrypt.compare(password, dbUser.password);
        if (!passwordMatch)
            return false;
        return await user.save();
    }

    async setPassword(userId, newPassword) {
        let user = await userModel.findByPk(userId);
        user.password = util?.hashPassword(newPassword);
        return await user.save();
    }

    async updatePassword(userId, newPassword) {
        let user = await userModel.findByPk(userId);

        user.password = util?.hashPassword(newPassword);
        return await user.save();
    }

    async isPasswordSet(userId) {
        let user = await userModel.findByPk(userId);
        return !!user.password;
    }
}