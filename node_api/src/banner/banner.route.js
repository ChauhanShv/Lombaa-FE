const router = require("../modules/express").instance.Router();
const authMiddleware = require("../auth/auth.middleware")
const BannerController = require("./banner.controller")

const controller = new BannerController();

module.exports = () => {
    router.get("/", authMiddleware, controller.getBanner)
    return router;
};
