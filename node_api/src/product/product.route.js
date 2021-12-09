const router = require("../modules/express").instance.Router();
const productController = require("./product.controller");
const productSchema = require("./product.schema");
const { checkSchema } = require("express-validator");

module.exports = () => {
  router.post("/", checkSchema(productSchema), productController.add);
  router.post("/list", productController.listing);
  router.get("/:id", productController.findById);
  return router;
};
