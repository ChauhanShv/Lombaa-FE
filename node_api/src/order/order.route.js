const router = require("../modules/express").instance.Router();
const authMiddleware = require("../auth/auth.middleware")
const orderController = require("./order.controller")

const controller = new orderController();

module.exports = () => {
    router.post("/", authMiddleware, controller.insertOrder)
    router.get("/invoice/:id/pdf", controller.createPdf)
    router.get("/invoice/:id", authMiddleware, controller.getInvoice)
    router.get("/", authMiddleware, controller.getOrder)
    return router;
};
