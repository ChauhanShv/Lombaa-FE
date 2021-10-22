const router = require("../modules/express").instance.Router();
const { checkSchema } = require("express-validator");
const UserController = require("./user.controller");
const schema = require("./user.data-schema");
const { setPassword: setPasswordSchema, activeSchema, phoneSchema, emailSchema } = require("./schema");
const authMiddleware = require("../auth/auth.middleware");

const controller = new UserController();

module.exports = () => {
    router.post("/", checkSchema(schema), (req, res, next) => controller.create(req, res, next));

    router.put("/password", authMiddleware, checkSchema(setPasswordSchema), (req, res, next) => controller.setPassword(req, res, next));
    router.put("/active", authMiddleware, checkSchema(activeSchema), controller.updateActive);
    router.put("/email", authMiddleware, checkSchema(emailSchema), controller.updateEmail);
    router.put("/phone", authMiddleware, checkSchema(phoneSchema), controller.updatePhone);

    router.delete("/facebook", authMiddleware, controller.deleteFacebook);
    router.delete("/google", authMiddleware, controller.deleteGoogle);

    return router;
};
