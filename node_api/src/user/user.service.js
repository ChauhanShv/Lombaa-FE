const util = require('./user.util');
const userModel = require('./user.model');
const User = require('./user.model');
const jwtService = require('../modules/jwt/jwt.service');
const appConfig = require('../app/app.config');
const eventEmitter = require('./user.subscriber');
const event = require('./user.event');
const bcrypt = require('bcrypt');
const { email } = require('../auth/data_schema/schema.auth');
const { user } = require('../modules/sequelize/sequelize.config');
const { findByPk } = require('./user.model');
const FileService = require("../file/file.service");
const FileType = require("file-type")
module.exports = class UserService extends FileService {
    constructor() {

        super();
        this.FileService = new FileService();
    }

    async verifyPassword(userId, password) {
        try {
            let user = await userModel.findByPk(userId);
            return await bcrypt.compare(password, user.password);
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async setPassword(userId, newPassword) {
        try {
            let user = await userModel.findByPk(userId);
            user.password = util?.hashPassword(newPassword);
            return await user.save();
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async updatePassword(userId, newPassword) {
        try {
            let user = await userModel.findByPk(userId);

            user.password = util?.hashPassword(newPassword);
            return await user.save();
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async hasPassword(userId) {
        try {
            let user = await userModel.findByPk(userId);
            return !!user.password;
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async hasEmail(userId) {
        try {
            let user = await userModel.findByPk(userId);
            return !!user.password;
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async isGoogleAccountAvailable(account, user) {
        try {
            let dUser = await userModel.findOne({ where: { googleId: account?.id } });

            if (!!dUser && user?.id !== dUser?.id)
                return false;
            return true;
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async isFacebookAccountAvailable(account, user) {
        try {
            let dUser = await userModel.findOne({ where: { facebookId: account?.id } });

            if (!!dUser && user?.id !== dUser?.id)
                return false;
            return true;
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async upsertGoogleAcount(account) {
        try {
            let user = await userModel.findOne({ where: { googleId: account?.id } });
            if (!user) {
                user = await User.create({
                    name: account?.name ?? '',
                    email: account?.email ?? null,
                    googleId: account?.id ?? null,
                    isEmailVerified: !!account?.email ? 1 : 0,
                    isGoogleVerified: 1
                });
            }
            user.email = user?.email ?? account?.email ?? null;
            user.isGoogleVerified = 1;
            user.googleId = account.id;
            return user.save();
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async upsertFacebookAcount(account) {
        try {
            let user = await userModel.findOne({ where: { facebookId: account?.id } });
            if (!user) {
                user = await User.create({
                    name: account?.name ?? '',
                    email: account?.email ?? null,
                    facebookId: account?.id ?? null,
                    isEmailVerified: !!account?.email ? 1 : 0,
                    isFacebookVerified: 1
                });
            }
            user.email = user?.email ?? account?.email ?? null;
            user.isFacebookVerified = 1;
            user.facebookId = account?.id;
            return user.save();
        }
        catch (error) {
            console.error({ error });
            return null
        }
    }

    async connectFacebook(account, user) {
        try {
            const dUser = await userModel.findByPk(user?.id);
            if (!dUser) return null;
            dUser.facebookId = account?.id;
            dUser.name = dUser?.name ?? account?.name ?? '';
            dUser.email = dUser?.email ?? account?.email ?? null;
            dUser.isEmailVerified = !!account?.email ? 1 : 0;
            dUser.isFacebookVerified = 1;

            return dUser.save();
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async connectGoogle(account, user) {
        try {
            const dUser = await userModel.findByPk(user?.id);
            if (!dUser) return null;
            dUser.googleId = account?.id;
            dUser.name = dUser?.name ?? account?.name ?? '';
            dUser.email = dUser?.email ?? account?.email ?? null;
            dUser.isEmailVerified = !!account?.email ? 1 : 0;
            dUser.isGoogleVerified = 1;

            return dUser.save();
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async forgetPassword(email) {
        try {
            let user = await userModel.findOne({ where: { email } });

            if (!user) return null;
            const resetPasswordToken = jwtService.encode({ id: user.id, email }, '1h');
            eventEmitter.emit(event.forgetPassword, { user, resetPasswordLink: `${appConfig.frontEndUrl}/password/reset/${resetPasswordToken}` });
        }
        catch (error) {
            console.error({ error });
            return null
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
            console.error({ error });
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
            console.error({ error });
            return null
        }
    }

    async requestChangeEmail(email, user) {
        try {
            const dUser = await User.update({ email: email, isEmailVerified: 0 }, { where: { id: user?.id } })
            if (!dUser) return null;

            const verificationToken = jwtService.encode({ id: user?.id, email }, '1h');
            eventEmitter.emit(event.changeEmail, { user, verificationLink: `${appConfig.frontEndUrl}/email/verify/${verificationToken}` });
            return dUser;
        } catch (error) {
            console.error({ error });
            return null
        }
    }

    async verifyEmailVerificationToken(token) {
        try {
            const payload = jwtService.decode(token);

            if (!payload?.id || !payload?.email) return null;
            let user = await userModel.findOne({ where: { id: payload.id, email: payload.email } });
            if (!user) return null;
            return user;
        }
        catch (error) {
            console.error({ error });
            return null;
        }
    }

    async markEmailVerified(user) {
        try {
            const dUser = await User.findByPk(user?.id);

            dUser.isEmailVerified = 1
            return dUser.save();
        }
        catch (error) {
            console.error({ error });
            return null;
        }
    }
    async uploadProfilePic(docs, s3Data, user) {
        if (!s3Data) {
            return false
        }
        if (!docs) {
            return false
        }
        try {
            const uploadedFile = await this.FileService.create(docs, s3Data, user)
            if (!uploadedFile) {
                return null
            }
            const dUser = await User.findByPk(user?.id);
            dUser.profilePictureId = uploadedFile.id
            return await dUser.save()
        }
        catch (error) {
            return null
        }
    }
    async uploadCoverPic(docs, s3Data, user) {
        if (!s3Data) {
            return false
        }
        if (!docs) {
            return false
        }
        try {
            const location = 's3'
            const uploadedFile = await this.FileService.create(docs, s3Data, location)

            if (!uploadedFile) {
                return null
            }
            const dUser = await User.findByPk(user?.id);
            dUser.coverPictureId = uploadedFile.id
            return await dUser.save()
        }
        catch (error) {
            return null
        }


    }
}