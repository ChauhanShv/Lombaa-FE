const router = require("../modules/express").instance.Router();
const authMiddleware = require("../auth/auth.middleware")
const transactionController = require("./transaction.controller")

const controller = new transactionController();

module.exports = () => {
    router.get("/", authMiddleware, controller.getTransaction)
    return router;
};
