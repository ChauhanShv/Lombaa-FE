const router = require("../modules/express").instance.Router();
const UserController = require("./user.controller");
const schema = require("./user.data-schema");
const { checkSchema } = require("express-validator");
const router = require("../modules/express").instance.Router();
const UserController = require("./user.controller");
const schema = require("./user.data-schema");
const { setPassword: setPasswordSchema } = require("./schema");
const authMiddleware = require("../auth/auth.middleware");

const { checkSchema } = require("express-validator");

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
  router.post("/deactivate", controller.userDeactivate);
  router.post("/fb/disconnect", controller.fbDisconnect);
  router.post("/google/disconnect", controller.googleDisconnect);
  router.post("/updateprofile", controller.updateProfile);

  return router;
};
