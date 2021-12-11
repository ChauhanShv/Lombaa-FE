const router = require("../modules/express").instance.Router();
const productController = require("./product.controller");
const productSchema = require("./product.schema");
const { checkSchema } = require("express-validator");
const productBodyManipulate = require("./product_post.middleware");


module.exports = () => {
  router.post("/", productBodyManipulate,
    async (req, res, next) => {
      const schema = checkSchema(await productSchema?.generate(req));
      await Promise.all(schema.map(chain => chain.run(req)));
      next();
    },
    productController.add
  );

  router.post("/list", productController.listing);
  router.get("/:id", productController.findById);
  return router;
};