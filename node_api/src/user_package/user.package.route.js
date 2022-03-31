const router = require("../modules/express").instance.Router();
const authMiddleware = require("../auth/auth.middleware")
const userPackageController = require("./user.package.controller")

const controller = new userPackageController();

module.exports = () => {
    router.get("/", authMiddleware, controller.getUserPackages)
    return router;
};
