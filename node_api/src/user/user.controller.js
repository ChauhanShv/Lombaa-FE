const BaseController = require("../modules/controller").base;
const model = require("./user.model");
const util = require("./user.util");
const { validationResult } = require("express-validator");
const validationErrorFormatter =
  require("../modules/formatter").validationErrorFormatter;
const responseFormatter = require("../modules/formatter").response;
const AuthService = require("../auth").service;

class UserController extends BaseController {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  get(req, res, next) {
    return super.jsonRes({ res, code: 200, data: model.findAll() });
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
      const token = this.authService.generateToken(newUser);
      const data = {
        success: true,
        message: "User created successfully.",
        response: { token },
        metadata: { user: newUser },
      };
      super.jsonRes({ res, code: 200, data: responseFormatter.format(data) });
    } catch (err) {
      next(err);
    }
  }
  userDeactivate = async (req, res, next) => {
    try {
      const userId = "5555555";
      const userDeactivate = await model.update({
        isActive: 0,
        where: { id: userId },
      });
      return super.jsonRes({
        res,
        code: 200,
        data: { success: true, message: "deactivated successfully" },
      });
    } catch {
      return super.jsonRes({
        res,
        code: 401,
        data: {
          message: "user not found",
        },
      });
    }
  };
  fbDisconnect = async (req, res, next) => {
    try {
      const userId = "44444";
      const fbDisconnect = await model.update({
        isFacebookVerified: 0,
        where: { id: userId },
      });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "facebook has been disconnected successfully",
        },
      });
    } catch {
      return super.jsonRes({
        res,
        code: 401,
        data: {
          message: "user not found",
        },
      });
    }
  };
  googleDisconnect = async (req, res, next) => {
    try {
      const userId = "51515151";
      const googleDisconnect = await model.update({
        isGoogleVerified: 0,
        where: { id: userId },
      });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "google has been disconnected successfully",
        },
      });
    } catch {
      super.jsonRes({
        res,
        code: 401,
        data: {
          message: "user not found",
        },
      });
    }
  };
  updateProfile = async (req, res, next) => {
    try {
      const values = req.body.data;
      const userId = "453";
      if (values.email) {
        const updateEmail = await model.update(
          {
            email: values.email,
          },
          { where: { id: userId } }
        );
      }
      if (values.phoneNumber) {
        const updatePhone = await model.update(
          {
            phoneNumber: values.phoneNumber,
          },
          { where: { id: userId } }
        );
      }
      return super.jsonRes({
        res,
        code: 200,
        data: { success: true, message: "update successfull" },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 401,
        data: { message: "invalid  details" },
      });
    }
  };
}

module.exports = UserController;
