const BaseController = require("../modules/controller").base;
const AuthService = require("./auth.service");
const jwtService = require("../modules/jwt").service;
const UserService = require("../user/user.service");
const config = require("./auth.config");
const jwt = require("../modules/jwt/jwt.service");

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = new AuthService();
    this.userService = new UserService();
  }

  async authenticate(req, res, next) {
    try {
      this.validationResult(req).formatWith(this.validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      let user = req.body;

      const authUser = await this.service.doAuth({ email: user.email, password: user.password });
      if (authUser?.isSuspended === 1) {
        const data = { success: false, error: { code: 401, message: "Your account is suspended. Please contact admin for support", message_detail: "Your account is suspended. Please contact admin for support" } };
        return super.jsonRes({ res, code: 401, data });
      }
      if (authUser) {
        const data = { success: true, message: "User logged in successfully.", response: { token: jwtService.encode({ id: authUser.id }, "1d"), refreshToken: jwtService.encode({ userId: authUser.id, type: "refresh_token" }, "30d") }, metadata: { user: authUser } };
        super.jsonRes({ res, code: 200, data });
      } else {
        const data = { success: false, error: { code: 4002, message: "Login Failed", messageDetail: "Email & Password combination is incorrect." } };
        super.jsonRes({ res, code: 400, data });
      }
    } catch (error) {
      next(error);
    }
  }

  async authenticateGoogle(req, res, next) {
    try {
      this.validationResult(req).formatWith(this.validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const { accessToken } = req.body;
      let user = req.user;

      const account = await this.service.googleAuth(accessToken);
      if (!account) {
        const data = { success: false, error: { code: 400401, message: "Failed google login/connect", messageDetail: "Google token verification failed" } };
        return super.jsonRes({ res, code: 400, data });
      }
      user = await this.userService.upsertGoogleAcount(account, user?.id);

      const data = { success: true, message: "Google connected", response: { token: jwtService.encode({ id: user.id }) }, metadata: { user: user } };
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      next(error);
    }
  }

  async authenticateFacebook(req, res, next) {
    try {
      this.validationResult(req).formatWith(this.validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      let { accessToken } = req.body;
      let user = req.user;

      const account = await this.service.facebookAuth(accessToken);

      if (!account) {
        const data = { success: false, error: { code: 400401, message: "Failed facebook login/connect", messageDetail: "Facebook token verification failed" } };
        return super.jsonRes({ res, code: 400, data });
      }

      user = await this.userService.upsertFacebookAcount(account, user?.id);

      const data = { success: true, message: "Facebook connected", response: { token: jwtService.encode({ id: user.id }) }, metadata: { user: user } };
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      this.validationResult(req).formatWith(this.validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      let { token } = req.body;

      const payload = jwt.decode(token);
      if (!payload) {
        const data = { success: false, error: { code: 400401, message: "Invalid token", messageDetail: "Failed to decode the token" } };
        return this.jsonRes({ res, code: 400, data });
      }

      if (!payload.type === "refresh_token") {
        const data = { success: false, error: { code: 400401, message: "Invalid token", messageDetail: "Token type is not refresh token" } };
        return this.jsonRes({ res, code: 400, data });
      }

      if (!payload?.userId) {
        const data = { success: false, error: { code: 400401, message: "Invalid token", messageDetail: "User id is missing in token" } };
        return this.jsonRes({ res, code: 400, data });
      }

      const data = { success: true, message: "Token refreshed successfully.", response: { token: jwtService.encode({ id: payload?.userId }) } };
      return super.jsonRes({ res, code: 200, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
