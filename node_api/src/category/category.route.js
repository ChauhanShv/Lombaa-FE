const router = require("../modules/express").instance.Router();
const CategoryController = require("./category.controller");
require('../category_field/category_field.model');
const authMiddleware = require("../auth/auth.middleware");
const { checkSchema } = require("express-validator");
const categoryIdSchema = require("./category.product_schema")
const optionalAuthMiddleware = require("../auth/optional.auth.middleware")

const controller = new CategoryController();

module.exports = () => {
    router.get("/", (req, res, next) => controller.categories(req, res, next));
    router.get("/:id/products", optionalAuthMiddleware, checkSchema(categoryIdSchema), controller.getProducts)
    // router.post("/add", (req, res, next) => Controller.add(req, res, next));

    return router;
}