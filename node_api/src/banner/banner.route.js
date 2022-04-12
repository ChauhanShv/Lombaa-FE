const router = require("../modules/express").instance.Router();
const BannerController = require("./banner.controller")

const controller = new BannerController();

module.exports = () => {
    router.get("/", controller.getBanner)
    return router;
};
