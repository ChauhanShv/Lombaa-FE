const BaseController = require("../modules/controller").base;
const AuthService = require("../auth").service;
const model = require("./user.model");
const util = require("./user.util");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../modules/formatter").validationErrorFormatter;
const responseFormatter = require("../modules/formatter").response;
const jwtService = require("../modules/jwt").service;
const UserService = require("./user.service");
const S3Service = require('../modules/s3/s3.service')
const { v4: uuidv4 } = require('uuid');
const FileType = require('file-type')


class UserController extends BaseController {
  constructor() {
    super();
    this.service = new UserService();
    this.authService = new AuthService();
    this.s3Service = new S3Service()
  }

  async create(req, res, next) {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    const body = req.body;

    const userData = {
      businessName: body.businessName,
      name: body?.name,
      email: body?.email,
      phoneNumber: body?.phoneNumber,
      accountType: body?.accountType,
      tinNumber: body?.tinNumber,
      password: util?.hashPassword(body.password),
    };

    try {
      const newUser = await model.create(userData);
      const token = jwtService.encode({ id: newUser.id });

      const data = { success: true, message: "User created successfully.", response: { token }, metadata: { user: newUser } };
      return super.jsonRes({ res, code: 200, data: responseFormatter.format(data) });
    } catch (err) {
      next(err);
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
      next(error);
    }
  }

  updateActive = async (req, res, next) => {
    try {
      const user = req.user;
      const { status } = req.body;

      await model.update({ isActive: status }, { where: { id: user.id } });
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Account status updated" } });
    } catch (error) {
      next(error)
    }
  };

  deleteFacebook = async (req, res, next) => {
    try {
      const user = req.user;

      await model.update({ isFacebookVerified: 0, facebookId: null }, { where: { id: user.id } });

      return super.jsonRes({ res, code: 200, data: { success: true, message: "Facebook disconnected" } });
    } catch (error) {
      next(error);
    }
  };

  deleteGoogle = async (req, res, next) => {
    try {
      const user = req.user;
      await model.update({ isGoogleVerified: 0, googleId: null }, { where: { id: user.id } });
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Google disconnected" } });
    } catch {
      next(error);
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
      const user = req.user

      if (!await this.service.requestChangeEmail(email, user))
        return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to request change email address" } });

      return super.jsonRes({ res, code: 200, data: { success: true, message: `Email Verification is sent at ${email}` } });
    } catch (error) {
      return next(error);
    }
  };

  verifyEmail = async (req, res, next) => {
    const { token } = req.body;

    let user = await this.service.verifyEmailVerificationToken(token);
    if (!user)
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Email verification failed", messageDetail: "Token verification failed" } });

    user = await this.service.markEmailVerified(user);
    if (!user)
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Email verification failed", messageDetail: "Failed to update verified status" } });

    return super.jsonRes({ res, code: 200, data: { success: true, message: "Email verified" } });
  }

  updatePhone = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const phoneNumber = req.body.phoneNumber;
      const user = req.user;

      await model.update({ phoneNumber: phoneNumber }, { where: { id: user.id } });

      return super.jsonRes({ res, code: 200, data: { success: true, message: "Phone update request received" } });
    } catch (error) {
      return next(error);
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
      return super.jsonRes({ res, code: 200, data: { success: true, message: `We have sent you password reset link at ${email}` } })
    } catch (error) {
      next(error);
    }
  }

  verifyResetPasswordToken = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { token } = req.body;

      if (await this.service.verifyResetPasswordToken(token))
        return super.jsonRes({ res, code: 200, data: { success: true, message: "Password token verified" } });
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Password token not verified" } });
    } catch (error) {
      next(error);
    }
  }

  resetPassword = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { token, newPassword } = req.body;

      if (await this.service.resetPassword(token, newPassword))
        return super.jsonRes({ res, code: 200, data: { success: true, message: "Password reset" } });
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to reset password" } });

    } catch (error) {
      next(error);
    }
  }

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
        const data = {
          success: false,
          error: {
            code: 400401,
            message: "Failed to connect to google",
            messageDetail: "Google access token verification failed",
          }
        }
        return super.jsonRes({ res, code: 400, data });
      }

      if (!await this.service.isGoogleAccountAvailable(account, user)) {
        const data = {
          success: false,
          error: {
            code: 400401,
            message: "Google account is already in use",
            messageDetail: "Google acount is resgistered to another account",
          }
        }
        return super.jsonRes({ res, code: 400, data });
      }

      user = await this.service.connectGoogle(account, user);

      if (!user) {
        const data = {
          success: false,
          error: {
            code: 400401,
            message: "Failed to connect facebook",
            messageDetail: "User not found",
          }
        }
        return super.jsonRes({ res, code: 400, data });
      }

      const data = {
        success: true,
        message: "Google connected",
        response: { token: jwtService.encode({ id: user.id }) },
        metadata: { user: user },
      }
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      next(error);
    }
  }


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
        const data = {
          success: false,
          error: {
            code: 400401,
            message: "Failed facebook login/connect",
            messageDetail: "Facebook token verification failed",
          }
        }
        return super.jsonRes({ res, code: 400, data });
      }

      if (!await this.service.isFacebookAccountAvailable(account, user)) {
        const data = {
          success: false,
          error: {
            code: 400401,
            message: "Facebook account is already in use",
            messageDetail: "Facebook acount is resgistered to another account",
          }
        }
        return super.jsonRes({ res, code: 400, data });
      }

      user = await this.service.connectFacebook(account, user);

      if (!user) {
        const data = {
          success: false,
          error: {
            code: 400401,
            message: "Failed to connect facebook",
            messageDetail: "User not found",
          }
        }
        return super.jsonRes({ res, code: 400, data });
      }

      const data = {
        success: true,
        message: "Facebook connected",
        response: { token: jwtService.encode({ id: user.id }) },
        metadata: { user: user },
      }
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      next(error);
    }
  }

  isActive = async (req, res, next) => {
    try {
      const user = req.user;
      const data = {
        success: true,
        message: "User is active",
        response: { user },
      }
      super.jsonRes({ res, code: 200, data });
    } catch (error) {
      return super.jsonRes({
        res,
        code: 401,
        data: { message: "Invalid user" },
      });
    }
  };

  updateUser = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { name, location, birthday, sex, bio, yearOfEstablishment, aboutBussiness } = req.body;
      const user = req.user;

      user.name = name;
      user.location = location;
      user.birthday = birthday;
      user.sex = sex;
      user.bio = bio
      user.yearOfEstablishment = yearOfEstablishment
      user.aboutBussiness = aboutBussiness

      const dUser = await user.save();

      const data = {
        success: true,
        message: "User updated",
        metadata: { user: dUser }
      }
      super.jsonRes({ res, code: 200, data })
    } catch (error) {
      next(error);
    }
  }

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
        return super.jsonRes({ res, code: 401, data: { success: false, message: "Failed to update  profile picture" } })
      }
      const dUser = await this.service.uploadProfilePic(req.files, s3Data, user)
      if (!dUser) {
        return super.jsonRes({ res, code: 401, data: { success: false, message: "Failed to update  profile picture" } })
      }
      super.jsonRes({ res, code: 200, data: { success: true, message: "Profile picture updated ", metadata: { user: dUser } } })
    }
    catch (error) {
      console.log(error)
      super.jsonRes({ res, code: 401, data: { success: false, message: "Failed to update  profile picture" } })
    }
  }

  uploadCoverPicture = async (req, res, next) => {
    try {
      const user = req.user;
      const data = req.files;
      const file = await FileType.fromBuffer(data[0].buffer);
      const key = `${uuidv4()}.${file.ext}`;
      const body = data[0].buffer;
      const s3Data = await this.s3Service.upload({ key, body });


      if (!s3Data) {
        return super.jsonRes({ res, code: 401, data: { success: false, message: "Failed to update cover picture" } })
      }
      const dUser = await this.service.uploadCoverPic(req.files, s3Data, user)
      if (!dUser) {
        return super.jsonRes({ res, code: 401, data: { success: false, message: "Failed to update cover picture" } })
      }
      super.jsonRes({ res, code: 200, data: { success: true, message: "cover picture updated ", metadata: { user: dUser } } })
    }
    catch (error) {
      super.jsonRes({ res, code: 401, data: { success: false, message: "Failed to update cover picture" } })
    }
  }
}



module.exports = UserController;
