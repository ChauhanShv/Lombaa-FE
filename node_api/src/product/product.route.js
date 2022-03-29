const router = require("../modules/express").instance.Router();
const ProductController = require("./product.controller");
const productSchema = require("./product.schema");
const { checkSchema } = require("express-validator");
const productMiddleware = require("./product.middleware");
const authMiddleware = require("../auth/auth.middleware");
const multer = require("multer");
const productMediaSchema = require("./schema/schema.product_media");
const productCategorySchema = require("./schema/schema.product_categoryId")
const optionalAuthMiddleware = require("../auth/optional.auth.middleware")
const similarProductSchema = require("./schema/similar.product.schema")
const getProductSchema = require("./schema/get.product.schema")

const storage = multer.memoryStorage();

const controller = new ProductController();

module.exports = () => {
  router.post(
    "/",
    authMiddleware,
    productMiddleware.manipulate,
    async (req, res, next) => {
      await Promise.all(checkSchema(await productSchema?.generate(req)).map((chain) => chain.run(req)));
      next();
    },
    controller.add
  );

  router.get("/listing", controller.listing);
  router.post("/media", authMiddleware, multer({ storage: storage }).any(), checkSchema(productMediaSchema), controller.uploadMedia);
  router.post("/:id", controller.soldProduct)
  router.get("/", optionalAuthMiddleware, controller.getRandom)
  router.get("/category", optionalAuthMiddleware, controller.searchCat)
  router.get("/:id", optionalAuthMiddleware, checkSchema(getProductSchema), controller.findById);
  router.get("/:id/similar", optionalAuthMiddleware, checkSchema(similarProductSchema), controller.lookALike)
  router.delete("/delete", authMiddleware, controller.delete)

  return router;
};
