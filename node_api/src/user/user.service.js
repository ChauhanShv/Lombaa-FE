const util = require("./user.util");
const userModel = require("./user.model");
const User = require("./user.model");
const jwtService = require("../modules/jwt/jwt.service");
const appConfig = require("../app/app.config");
const eventEmitter = require("./user.subscriber");
const event = require("./user.event");
const bcrypt = require("bcrypt");
const { email } = require("../auth/data_schema/schema.auth");
const { user } = require("../modules/sequelize/sequelize.config");
const { findByPk } = require("./user.model");
const FileService = require("../file/file.service");
const FileType = require("file-type");
const fileModel = require("../file/file.model");
const moment = require("moment");
const Location = require("../location/location.model");
const Product = require("../product/product.model");
const FavoriteProduct = require("./user.favorite_product_model");

class UserService {
  constructor() {
    this.fileService = new FileService();
  }

  async verifyPassword(userId, password) {
    try {
      let user = await userModel.scope(null).findByPk(userId);
      return await bcrypt.compare(password, user.password);
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async setPassword(userId, newPassword) {
    try {
      let user = await userModel.findByPk(userId);
      user.password = util?.hashPassword(newPassword);
      return await user.save();
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async updatePassword(userId, newPassword) {
    try {
      let user = await userModel.findByPk(userId);

      user.password = util?.hashPassword(newPassword);
      return await user.save();
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async hasPassword(userId) {
    try {
      let user = await userModel.scope(null).findByPk(userId);
      return !!user.password;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async hasEmail(userId) {
    try {
      let user = await userModel.scope(null).findByPk(userId);
      return !!user.password;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async isGoogleAccountAvailable(account, user) {
    try {
      let dUser = await userModel.findOne({ where: { googleId: account?.id } });

      if (!!dUser && user?.id !== dUser?.id) return false;
      return true;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async isFacebookAccountAvailable(account, user) {
    try {
      let dUser = await userModel.findOne({ where: { facebookId: account?.id } });

      if (!!dUser && user?.id !== dUser?.id) return false;
      return true;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async upsertGoogleAcount(account) {
    try {
      let user = await userModel.findOne({ where: { googleId: account?.id } });
      if (!user) {
        user = await User.create({
          name: account?.name ?? "",
          email: account?.email ?? null,
          googleId: account?.id ?? null,
          isEmailVerified: !!account?.email ? 1 : 0,
          isGoogleVerified: 1,
        });
      }
      user.email = user?.email ?? account?.email ?? null;
      user.isGoogleVerified = 1;
      user.googleId = account.id;
      return user.save();
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async upsertFacebookAcount(account) {
    try {
      let user = await userModel.findOne({ where: { facebookId: account?.id } });
      if (!user) {
        user = await User.create({
          name: account?.name ?? "",
          email: account?.email ?? null,
          facebookId: account?.id ?? null,
          isEmailVerified: !!account?.email ? 1 : 0,
          isFacebookVerified: 1,
        });
      }
      user.email = user?.email ?? account?.email ?? null;
      user.isFacebookVerified = 1;
      user.facebookId = account?.id;
      return user.save();
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async connectFacebook(account, user) {
    try {
      const dUser = await userModel.findByPk(user?.id);
      if (!dUser) return null;
      dUser.facebookId = account?.id;
      dUser.name = dUser?.name ?? account?.name ?? "";
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
      dUser.name = dUser?.name ?? account?.name ?? "";
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
      const resetPasswordToken = jwtService.encode({ id: user.id, email }, "1h");
      eventEmitter.emit(event.forgetPassword, { user, resetPasswordLink: `${appConfig.frontEndUrl}/password/reset?token=${resetPasswordToken}` });
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async verifyResetPasswordToken(token) {
    try {
      const payload = jwtService.decode(token);

      if (!payload?.id) return null;
      let user = await userModel.findByPk(payload?.id);
      if (!user) return null;
      return user;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async resetPassword(token, newPassword) {
    try {
      if (!token || !newPassword) return null;
      const user = await this.verifyResetPasswordToken(token);
      if (!user) return null;
      return await this.updatePassword(user.id, newPassword);
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async requestChangeEmail(email, user) {
    try {
      const dUser = await User.update({ email: email, isEmailVerified: 0 }, { where: { id: user?.id } });
      if (!dUser) return null;

      const verificationToken = jwtService.encode({ id: user?.id, email }, "1h");
      eventEmitter.emit(event.newEmail, { user, verificationLink: `${appConfig.frontEndUrl}/email/verify?token=${verificationToken}` });
      return dUser;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async verifyEmailVerificationToken(token) {
    try {
      const payload = jwtService.decode(token);

      if (!payload?.id || !payload?.email) return null;
      let user = await userModel.findOne({ where: { id: payload.id, email: payload.email } });
      if (!user) return null;
      return user;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async markEmailVerified(user) {
    try {
      const dUser = await User.findByPk(user?.id);

      dUser.isEmailVerified = 1;
      return dUser.save();
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async uploadProfilePic(docs, s3Data, user) {
    if (!s3Data || !docs) return false;
    try {
      const location = "S3";
      const relativePath = "";
      const uploadedFile = await this.fileService.create(docs, s3Data, location, relativePath);
      if (!uploadedFile) {
        return null;
      }
      const dUser = await User.findByPk(user?.id);
      dUser.profilePictureId = uploadedFile?.id;
      dUser.isSelfieVerified = 1;
      await dUser.save();

      return await User.findOne({
        attributes: { exclude: ["password"] },
        where: { id: dUser?.id },
        include: [
          { model: fileModel, as: "profilePicture" },
          { model: fileModel, as: "coverPicture" },
        ],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async uploadCoverPic(docs, s3Data, user) {
    if (!s3Data || !docs) return false;
    try {
      const location = "S3";
      const relativePath = " ";
      const uploadedFile = await this.fileService.create(docs, s3Data, location, relativePath);
      if (!uploadedFile) {
        return null;
      }
      const dUser = await User.findByPk(user?.id);
      dUser.coverPictureId = uploadedFile?.id;
      await dUser.save();

      return await User.findOne({
        attributes: { exclude: ["password"] },
        where: { id: dUser?.id },
        include: [
          { model: fileModel, as: "profilePicture" },
          { model: fileModel, as: "coverPicture" },
        ],
      });
    } catch (error) {
      return null;
    }
  }
  async getUser(payload) {
    let user = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { id: payload.id },
      include: [
        { model: fileModel, as: "profilePicture" },
        { model: fileModel, as: "coverPicture" },
        { model: Location, as: "location" },
      ],
    });
    if (!user) return null;

    user.profileVerificationScore = await this.calculateProfileScore(user);

    return user;
  }
  async calculateProfileScore(user) {
    let verificationScore = 0;
    if (user.isFacebookVerified === 1) {
      verificationScore += 20;
    }
    if (user.isGoogleVerified === 1) {
      verificationScore += 20;
    }
    if (user.isPhoneVerified === 1) {
      verificationScore += 20;
    }
    if (user.isSelfieVerified === 1) {
      verificationScore += 20;
    }
    if (user.isEmailVerified === 1) {
      verificationScore += 20;
    }
    return verificationScore;
  }

  updateLastActiveTime(user) {
    user.lastActiveAt = moment().format("YYYY-MM-DD HH:mm:ss");
    user.save();
  }

  async getFavoriteProducts(userId) {
    return await User.findOne({ where: { id: userId }, include: [{ model: Product, through: { attributes: [] } }] });
  }

  async alreadyInFavorites(userId, productId) {
    const user = await User.findOne({ where: { id: userId }, include: [{ model: Product, through: { attributes: [] } }] });
    return user.Products?.length;
  }

  async addFavoriteProduct(userId, productId) {
    return await FavoriteProduct.create({ userId, productId });
  }
}

module.exports = UserService;
