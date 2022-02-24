const router = require("../modules/express").instance.Router();
const notificationController = require("./notification.controller");
const authMiddleware = require("../auth/auth.middleware")
const idSchema = require('./notification.schema')
const { checkSchema } = require("express-validator");

const controller = new notificationController();

module.exports = () => {
    router.get("/", authMiddleware, controller.getNotification)
    router.post("/seen", authMiddleware, checkSchema(idSchema), controller.markAsRead)
    router.delete("/", authMiddleware, checkSchema(idSchema), controller.delete)
    return router;
};
