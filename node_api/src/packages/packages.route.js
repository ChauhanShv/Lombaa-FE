const router = require("../modules/express").instance.Router();
const authMiddleware = require("../auth/auth.middleware")
const PackageController = require("./packages.controller")

const controller = new PackageController();

module.exports = () => {
    router.get("/", authMiddleware, controller.getPackages)
    router.get("/:id", authMiddleware, controller.getById)
    router.post("/buy", authMiddleware, controller.buyPackage)
    return router;
};
