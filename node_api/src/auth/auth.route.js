const router = require("../modules/express").instance.Router();
const AuthController = require("./auth.controller");
const { schema, googleSchema, facebookSchema, refreshTokenSchema } = require("./data_schema");
const { checkSchema } = require("express-validator");

const controller = new AuthController();

module.exports = () => {
  router.post("/", checkSchema(schema), (req, res, next) => controller.authenticate(req, res, next));
  router.post("/google", checkSchema(googleSchema), (req, res, next) => controller.authenticateGoogle(req, res, next));
  router.post("/facebook", checkSchema(facebookSchema), (req, res, next) => controller.authenticateFacebook(req, res, next));
  router.post("/token/refresh", checkSchema(refreshTokenSchema), (req, res, next) => controller.refreshToken(req, res, next));

  return router;
};
