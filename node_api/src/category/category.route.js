const router = require("../modules/express").instance.Router();
const CategoryController = require("./category.controller");

const Controller = new CategoryController();

module.exports = () => {
    router.get("/", (req, res, next) => Controller.Categories(req, res, next));
    router.post("/add", (req, res, next) => Controller.add(req, res, next));

    return router
}