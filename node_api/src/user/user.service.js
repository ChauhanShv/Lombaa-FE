const util = require('./user.util');
const userModel = require('./user.model');
const User = require('./user.model');

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

    async hasPassword(userId) {
        let user = await userModel.findByPk(userId);
        return !!user.password;
    }

    async hasEmail(userId) {
        let user = await userModel.findByPk(userId);
        return !!user.password;
    }

    async upsertGoogleAcount(account, userId) {
        let user = !!userId ? await userModel.findByPk(userId) : null;
        if (!user) {
            user = await User.create({
                name: account?.name ?? '',
                email: account?.email ?? null,
                isGoogleVerified: 1
            });
        }
        user.email = user?.email ?? account?.email ?? null;
        user.isGoogleVerified = 1;
        user.googleId = account.sub;
        return user.save();
    }

    async upsertFacebookAcount(account, userId) {
        let user = !!userId ? await userModel.findByPk(userId) : null;
        if (!user) {
            user = await User.create({
                name: account?.name ?? '',
                email: account?.email ?? null,
                isFacebookVerified: 1
            });
        }
        user.email = user?.email ?? account?.email ?? null;
        user.isFacebookVerified = 1;
        user.facebookId = account?.id;
        return user.save();
    }
}