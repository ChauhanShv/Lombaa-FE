const BaseController = require("../modules/controller").base;
const AuthService = require("../auth").service;
const User = require("./user.model");
const util = require("./user.util");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../modules/formatter").validationErrorFormatter;
const responseFormatter = require("../modules/formatter").response;
const jwtService = require("../modules/jwt").service;
const UserService = require("./user.service");
const S3Service = require("../modules/s3/s3.service");
const { v4: uuidv4 } = require("uuid");
const FileType = require("file-type");
const eventEmitter = require("./user.subscriber");
const event = require("./user.event");
const appConfig = require("../app/app.config");
const LocationService = require("../location/location.service");
const ProductService = require("../product/product.service");
require("./user.favorite_product_model");
const Product = require("../product/product.model")
const viewedProduct = require("../viewed_product/viewed.product.model")
const moment = require("moment")
const Category = require("../category/category.model")
const ProductField = require("../product/product_field.model")
const Field = require("../field/field.model")
const ProductMedia = require("../product/product_media.model");
const fileModel = require("../file/file.model")
const Location = require("../location/location.model")

class UserController extends BaseController {
  constructor() {
    super();
    this.service = new UserService();
    this.authService = new AuthService();
    this.s3Service = new S3Service();
    this.locationService = new LocationService();
    this.productService = new ProductService();
  }

  async create(req, res, next) {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    const body = req.body;

    const userData = { businessName: body.businessName, name: body?.name, email: body?.email, phoneNumber: body?.phoneNumber, phoneCode: body?.phoneCode, accountType: body?.accountType, tinNumber: body?.tinNumber, password: util?.hashPassword(body.password), isPhoneVerified: true };

    try {
      const newUser = await User.create(userData);
      newUser.password = undefined;

      const token = jwtService.encode({ id: newUser.id });

      const data = { success: true, message: "User created successfully.", response: { token }, metadata: { user: newUser } };

      const verificationToken = jwtService.encode({ id: newUser?.id, email: newUser?.email }, "1h");
      eventEmitter.emit(event.newEmail, { user: newUser, verificationLink: `${appConfig.frontEndUrl}/email/verify?token=${verificationToken}` });

      return super.jsonRes({ res, code: 200, data: responseFormatter.format(data) });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to create user", message_detail: error?.message } })
    }
  }

  async setPassword(req, res, next) {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const user = req.user;
      const { password } = req.body;
      const updatedUser = await this.service.setPassword(user.id, password);

      return super.jsonRes({ res, code: 200, data: { success: true, message: "Password changed", metadata: { user: updatedUser } } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to reset password", messageDetail: error?.message } })
    }
  }

  updateActive = async (req, res, next) => {
    try {
      const user = req.user;
      const { status } = req.body;

      await User.update({ isActive: status }, { where: { id: user.id } });
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Account status updated" } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to update status", message_detail: error?.message } })
    }
  };

  deleteFacebook = async (req, res, next) => {
    try {
      const user = req.user;

      await User.update({ isFacebookVerified: 0, facebookId: null }, { where: { id: user.id } });

      return super.jsonRes({ res, code: 200, data: { success: true, message: "Facebook disconnected" } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to disconnect facebook", message_detail: error?.message } })
    }
  };

  deleteGoogle = async (req, res, next) => {
    try {
      const user = req.user;
      await User.update({ isGoogleVerified: 0, googleId: null }, { where: { id: user.id } });
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Google disconnected" } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to disconnect google", message_detail: error?.message } })
    }
  };

  changeEmail = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { email } = req.body;
      const user = req.user;

      if (!(await this.service.requestChangeEmail(email, user))) {
        const data = { success: false, error: { code: 400, message: "Failed to request change email address", messageDetail: "Something went wrong " } };
        return super.jsonRes({ res, code: 400, data });
      }

      return super.jsonRes({ res, code: 200, data: { success: true, message: `Email Verification is sent at ${email}` } });
    } catch (error) {
      return super.jsonRes({ res, success: false, error: { code: 42201, message: "Failed to change email", messageDetail: "Please provide a valid Email address" } });
    }
  };

  verifyEmail = async (req, res, next) => {
    try {
      const { token } = req.body;

      let user = await this.service.verifyEmailVerificationToken(token);
      if (!user) {
        const data = { success: false, error: { code: 400, message: "Email verification failed", messageDetail: "Token verification failed" } };
        return super.jsonRes({ res, code: 400, data });
      }

      user = await this.service.markEmailVerified(user);
      if (!user) {
        const data = { success: false, error: { code: 400, message: "Email verification failed", messageDetail: "Failed to update verified status" } };
        return super.jsonRes({ res, code: 400, data });
      }

      return super.jsonRes({ res, code: 200, data: { success: true, message: "Email verified" } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to verify email", message_detail: error?.message } })
    }
  }

  updatePhone = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const phoneNumber = req.body.phone;
      const phoneCode = req.body.phoneCode;
      const user = req.user;

      await User.update({ phoneNumber: phoneNumber, phoneCode, isPhoneVerified: 1 }, { where: { id: user.id } });

      req.user.phoneNumber = phoneNumber;
      req.user.phoneCode = phoneCode;

      return super.jsonRes({ res, req, code: 200, data: { success: true, message: "Phone update request received" } });
    } catch (error) {
      return super.jsonRes({ res, req, code: 40021, data: { success: false, message: "Failed to update Phonenumber", message_detail: error.message } });
    }
  };

  updatePhoneShowConsent = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const user = req.user;
      await User.update({ showPhoneNumberConsent: req.body.consent }, { where: { id: user.id }, returning: true });

      req.user.showPhoneNumberConsent = req.body.consent;

      return super.jsonRes({ res, req, code: 200, data: { success: true, message: "Show phone number consent updated" } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to show phone number consent", message_detail: error?.message } })
    }
  };

  forgetPassword = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { email } = req.body;
      await this.service.forgetPassword(email);
      return super.jsonRes({ res, code: 200, data: { success: true, message: `We have sent you password reset link at ${email}` } });
    } catch (error) {
      return super.jsonRes({
        res, code: 400, data: { success: false, message: "Failed to sent password reset link", message_detail: error?.message }
      })
    }
  };

  verifyResetPasswordToken = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { token } = req.body;

      if (await this.service.verifyResetPasswordToken(token)) return super.jsonRes({ res, code: 200, data: { success: true, message: "Password token verified" } });
      const data = {
        success: false,
        error: { code: 400, message: "Password token not verified", message_detail: "Can't read your token" },
      };
      return super.jsonRes({ res, code: 400, data });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { token, newPassword } = req.body;

      if (await this.service.resetPassword(token, newPassword)) return super.jsonRes({ res, code: 200, data: { success: true, message: "Password reseted" } });
      const data = { success: false, error: { code: 400, message: "Failed to reset password", messageDetail: "your password request failed" } };
      return super.jsonRes({ res, code: 400, data });
    } catch (error) {
      return super.jsonRes({ res, success: false, error: { code: 42201, message: "Failed to reset Password", messageDetail: "Please provide a proper Password" } });
    }
  };

  resendEmailVerification = async (req, res, next) => {
    try {
      const user = req.user;

      const verificationToken = jwtService.encode({ id: user?.id, email: user?.email }, "1h");
      eventEmitter.emit(event.newEmail, { user: user, verificationLink: `${appConfig.frontEndUrl}/email/verify?token=${verificationToken}` });

      super.jsonRes({ res, code: 200, data: { success: true, message: "Email verification link sent" } });
    } catch (e) {
      super.jsonRes({ res, code: 400, data: {} })
    }
  };

  connectGoogle = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      let { accessToken } = req.body;
      let user = req.user;

      const account = await this.authService.googleAuth(accessToken);

      if (!account) {
        const data = { success: false, error: { code: 400401, message: "Failed to connect to google", messageDetail: "Google access token verification failed" } };
        return super.jsonRes({ res, code: 400, data });
      }

      if (!(await this.service.isGoogleAccountAvailable(account, user))) {
        const data = { success: false, error: { code: 400401, message: "Google account is already in use", messageDetail: "Google acount is resgistered to another account" } };
        return super.jsonRes({ res, code: 400, data });
      }

      user = await this.service.connectGoogle(account, user);

      if (!user) {
        const data = { success: false, error: { code: 400401, message: "Failed to connect facebook", messageDetail: "User not found" } };
        return super.jsonRes({ res, code: 400, data });
      }

      const data = { success: true, message: "Google connected", response: { token: jwtService.encode({ id: user.id }) }, metadata: { user: user } };
      return super.jsonRes({ req, res, code: 200, data });
    } catch (error) {
      next(error);
    }
  };

  connectFacebook = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      let { accessToken } = req.body;
      let user = req.user;

      const account = await this.authService.facebookAuth(accessToken);

      if (!account) {
        const data = { success: false, error: { code: 400401, message: "Failed facebook login/connect", messageDetail: "Facebook token verification failed" } };
        return super.jsonRes({ res, code: 400, data });
      }

      if (!(await this.service.isFacebookAccountAvailable(account, user))) {
        const data = {
          success: false,
          error: { code: 400401, message: "Facebook account is already in use", messageDetail: "Facebook acount is resgistered to another account" },
        };
        return super.jsonRes({ res, code: 400, data });
      }

      user = await this.service.connectFacebook(account, user);

      if (!user) {
        const data = { success: false, error: { code: 400401, message: "Failed to connect facebook", messageDetail: "User not found" } };
        return super.jsonRes({ res, code: 400, data });
      }

      const data = { success: true, message: "Facebook connected", response: { token: jwtService.encode({ id: user.id }) }, metadata: { user: user } };
      return super.jsonRes({ req, res, code: 200, data });
    } catch (error) {
      next(error);
    }
  };

  isActive = async (req, res, next) => {
    try {
      const user = req.user;
      const data = { success: true, message: "User is active", response: { user } };
      super.jsonRes({ res, code: 200, data });
    } catch (error) {
      return super.jsonRes({ res, code: 401, data: { success: false, message: "Invalid user", message_detail: " Something went wrong" } });
    }
  };

  updateUser = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { name, location, birthday, sex, bio, yearOfEstablishment, aboutBusiness, businessName, tinNumber, accountType } = req.body;
      const user = req.user;

      let loc = null;

      if (location) loc = await this.locationService.upsert(location?.country, location?.region, location?.city);

      if (name) user.name = name;
      if (loc?.id) user.locationId = loc?.id;
      if (birthday) user.birthday = birthday;
      if (sex) user.sex = sex;
      if (bio) user.bio = bio;
      if (yearOfEstablishment) user.yearOfEstablishment = yearOfEstablishment;
      if (aboutBusiness) user.aboutBusiness = aboutBusiness;
      if (businessName) user.businessName = businessName;
      if (tinNumber) user.tinNumber = tinNumber;
      if (accountType) user.accountType = accountType;

      const dUser = await user.save();

      const resUser = await this.service.getUser({ id: dUser?.id });

      const data = { success: true, message: "Profile updated", metadata: { user: resUser } };
      super.jsonRes({ res, code: 200, data });
    } catch (error) {
      super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to update user", message_detail: error?.message } })
    }
  };

  uploadProfilePicture = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const user = req.user;
      const data = req.files;
      const file = await FileType.fromBuffer(data[0].buffer);
      const key = `${uuidv4()}.${file.ext}`;
      const body = data[0].buffer;
      const s3Data = await this.s3Service.upload({ key, body });

      if (!s3Data) {
        const data = {
          success: false,
          error: { code: 400, message: "Failed to update profile picture", message_detail: "s3 is enable to allow you space" },
        };
        return super.jsonRes({ res, code: 400, data });
      }
      const dUser = await this.service.uploadProfilePic(req.files, s3Data, user);
      if (!dUser) {
        const data = { success: false, error: { code: 400, message: "Failed to update profile picture", message_detail: "Unable to load user data" } };
        return super.jsonRes({ res, code: 400, data });
      }
      super.jsonRes({ res, code: 200, data: { success: true, message: "Profile picture updated ", metadata: { user: dUser } } });
    } catch (error) {
      const data = {
        success: false,
        error: { code: 400, message: "Failed to update profile picture", message_detail: "something went wrong" },
      };
      super.jsonRes({ res, code: 400 });
    }
  };

  uploadCoverPicture = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const user = req.user;
      const data = req.files;
      const file = await FileType.fromBuffer(data[0].buffer);
      const key = `${uuidv4()}.${file.ext}`;
      const body = data[0].buffer;
      const s3Data = await this.s3Service.upload({ key, body });

      if (!s3Data) {
        const data = { success: false, error: { code: 400, message: "Failed to update cover picture", message_detail: "Unable to load user data" } };
        return super.jsonRes({ res, code: 400, data });
      }
      const dUser = await this.service.uploadCoverPic(req.files, s3Data, user);
      if (!dUser) {
        const data = { success: false, error: { code: 400, message: "Failed to update cover picture", message_detail: "Unable to load user data" } };
        return super.jsonRes({ res, code: 400, data });
      }
      super.jsonRes({ res, code: 200, data: { success: true, message: "Cover picture updated ", metadata: { user: dUser } } });
    } catch (error) {
      const data = { success: false, error: { code: 400, message: "Failed to update cover picture", message_detail: "Something went wrong" } };
      super.jsonRes({ res, code: 400, data });
    }
  };

  products = async (req, res, next) => {
    try {
      const userId = req.user?.id;

      const inReview = await this.productService?.getUserInReviewProducts(userId);
      const active = await this.productService?.getUserActiveProducts(userId);
      const declined = await this.productService?.getUserDeclinedProducts(userId);
      const expired = await this.productService?.getUserExpiredProducts(userId);
      const sold = await this.productService?.getUserSoldProducts(userId);

      const data = { success: true, message: "Fetched user product listing", response: { inReview, active, declined, expired, sold } };
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  };

  favoriteProducts = async (req, res, next) => {
    try {
      const userId = req.user?.id;

      const favorites = await this.service.getFavoriteProducts(userId);

      const data = { success: true, message: "Fetched user favorite products", response: { favorites: favorites?.Products } };
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  };

  addFavoriteProduct = async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const { productId } = req.body;

      if (await this.service.alreadyInFavorites(userId, productId)) {
        const data = { success: false, error: { code: 400, message: "Already in favorites", message_detail: "Duplicate entry found in user favorites" } };
        return super.jsonRes({ res, code: 400, data });
      }

      await this.service.addFavoriteProduct(userId, productId);

      const data = { success: true, message: "Added to favorites" };
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "No data found", message_detail: error.message } })
    }
  };

  deleteFavoriteProduct = async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const { productId } = req.body;
      await this.service.deleteFavoriteProduct(userId, productId)
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Product has been deleted" } })
    }
    catch {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Something went wrong", message_detail: error?.message } })
    }
  }

  last30Days = async (req, res, next) => {
    try {
      const Op = require('Sequelize').Op
      const userId = req.user?.id;
      console.log(userId)
      // const data = await model.findOne({
      //   where: {
      //     userId: userId, createdAt: {
      //       [Op.lte]: moment(),
      //       [Op.gte]: moment().subtract(30, 'days').toDate()
      //     },
      //   },
      //   include: [{ model: Product, as: "product" }]
      // })
      const products = await User.findOne({
        where: { id: userId },
        include: [{
          model: Product, through: {
            where: {
              createdAt: {
                [Op.lte]: moment(),
                [Op.gte]: moment().subtract(30, 'days').toDate()
              }
            },
            attributes: []
          },
          include: [
            { model: Category, as: 'category' },
            { model: Location, as: "location" },
            { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
            { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] }
          ]
        }],
        attributes: ["name"]
      })
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Product viewed", data: products } })
    }
    catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Something went wrong", message_detail: error?.message } })
    }
  }

  expiredProducts = async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const expired = await this.productService.getUserExpiredProducts(userId)
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Products retrieved", data: expired } })
    }
    catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to load products", message_detail: error?.message } })
    }
  }

  soldProducts = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const sold = await this.productService.getUserSoldProducts(userId)
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Products retrieved", data: sold } })
    }
    catch (error) {
      return super.jsonRes({ res, code: 200, data: { success: false, message: "Failed to load products", message_detail: error?.message } })
    }
  }


}

module.exports = UserController;
