const router = require("../modules/express").instance.Router();
const authMiddleware = require("../auth/auth.middleware")
const orderController = require("./order.controller")

const controller = new orderController();

module.exports = () => {
    router.post("/insert", authMiddleware, controller.insertOrder)
    router.get("/", authMiddleware, controller.getOrder)
    return router;
};
