const router = require("../modules/express").instance.Router();
const StaticPageController = require("./static_page.controller");

const controller = new StaticPageController();

module.exports = () => {
    router.get("/:slug", (req, res, next) => controller.getBySlug(req, res, next));

    return router;
}