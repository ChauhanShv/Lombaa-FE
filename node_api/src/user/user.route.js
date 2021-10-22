const router = require("../modules/express").instance.Router();
const { checkSchema } = require("express-validator");
const UserController = require("./user.controller");
const schema = require("./user.data-schema");
const { setPassword: setPasswordSchema } = require("./schema");
const emailSchema = require("./schema").emailSchema;
const authMiddleware = require("../auth/auth.middleware");
const phoneSchema = require("./schema").phoneSchema;

const controller = new UserController();

module.exports = () => {
  router.post("/", checkSchema(schema), (req, res, next) =>
    controller.create(req, res, next)
  );
  router.put(
    "/password",
    authMiddleware,
    checkSchema(setPasswordSchema),
    (req, res, next) => controller.setPassword(req, res, next)
  );
  router.post("/deactivate", authMiddleware, controller.userDeactivate);
  router.post("/fb/disconnect", authMiddleware, controller.fbDisconnect);
  router.post(
    "/google/disconnect",
    authMiddleware,
    controller.googleDisconnect
  );
  router.post(
    "/updateEmail",
    authMiddleware,
    checkSchema(emailSchema),
    controller.updateEmail
  );
  router.post(
    "/updatePhoneNumber",
    authMiddleware,
    checkSchema(phoneSchema),
    controller.updatePhoneNumber
  );

  return router;
};
