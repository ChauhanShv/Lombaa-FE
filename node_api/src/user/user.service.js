const util = require('./user.util');
const userModel = require('./user.model');
const User = require('./user.model');
const jwtService = require('../modules/jwt/jwt.service');
const appConfig = require('../app/app.config');
const eventEmitter = require('./user.subscriber');
const event = require('./user.event');

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

    async forgetPassword(email) {
        try {
            let user = await userModel.findOne({ where: { email } });

            if (!user) return null;
            const resetPasswordToken = jwtService.encode({ id: user.id, email }, '1h');
            eventEmitter.emit(event.forgetPassword, { user, resetPasswordUrl: `${appConfig.frontEndUrl}/password/reset/${resetPasswordToken}` });
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async verifyResetPasswordToken(token) {
        try {
            const payload = jwtService.decode(token);

            if (!payload?.id) return null;
            let user = await userModel.findByPk(payload?.id);
            if (!user) return null;
            return user;
        }
        catch (error) {
            return null;
        }
    }

    async resetPassword(token, newPassword) {
        try {
            if (!token || !newPassword) return null;
            const user = await this.verifyResetPasswordToken(token)
            if (!user) return null;
            return await this.updatePassword(user.id, newPassword);
        } catch (error) {
            throw new Error(error);
        }
    }
}