const router = require("../modules/express").instance.Router();
const authMiddleware = require("../auth/auth.middleware")
const invoiceController = require("./invoice.controller")

const controller = new invoiceController();

module.exports = () => {
    router.get("/:id", authMiddleware, controller.getInvoice)
    router.post("/insert", authMiddleware, controller.insertInvoice)
    return router;
};
