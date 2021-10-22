const BaseController = require("../modules/controller").base;
const AuthService = require("../auth").service;
const model = require("./user.model");
const util = require("./user.util");
const { validationResult } = require("express-validator");
const validationErrorFormatter =
  require("../modules/formatter").validationErrorFormatter;
const responseFormatter = require("../modules/formatter").response;
const jwtService = require("../modules/jwt").service;
const UserService = require("./user.service");

class UserController extends BaseController {
  constructor() {
    super();
    this.service = new UserService();
    this.authService = new AuthService();
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

  async setPassword(req, res, next) {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const user = req.user;
      const { password } = req.body;
      const updateUser = await this.service.setPassword(user.id, password);
      super.jsonRes({
        res,
        code: 201,
        data: {
          success: true,
          message: "Password changed",
          metadata: { user: updateUser },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  userDeactivate = async (req, res, next) => {
    try {
      const user = req.user;
      const userDeactivate = await model.update({
        isActive: 0,
        where: { id: user.id },
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
      const user = req.user;
      const fbDisconnect = await model.update({
        isFacebookVerified: 0,
        where: { id: user.id },
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
      const user = req.user;
      const googleDisconnect = await model.update({
        isGoogleVerified: 0,
        where: { id: user.id },
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
  updateEmail = async (req, res, next) => {
    try {
      try {
        validationResult(req).formatWith(validationErrorFormatter).throw();
      } catch (error) {
        return res
          .status(422)
          .json(error.array({ onlyFirstError: true }))
          .end();
      }
      const values = req.body.email;
      const user = req.user;
      const updateEmail = await model.update(
        {
          email: values,
        },
        { where: { id: user.id } }
      );

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
  updatePhoneNumber = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }
    try {
      const phoneNumber = req.body.phoneNumber;
      const user = req.user;

      const updatePhoneNumber = await model.update(
        {
          phoneNumber: phoneNumber,
        },
        { where: { id: user.id } }
      );
      return super.jsonRes({
        res,
        code: 200,
        data: { success: true, message: "update successfull" },
      });
    } catch (error) {
      return super.jsonRes({
        res,
        code: 401,
        data: { message: "invalid  details" },
      });
    }
  };
}

module.exports = UserController;
