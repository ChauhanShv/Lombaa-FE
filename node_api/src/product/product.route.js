const router = require("../modules/express").instance.Router();
const productController = require("./product.controller");
const productSchema = require("./product.schema");
const { checkSchema } = require("express-validator");
const productMiddleware = require("./product.middleware");
const authMiddleware = require("../auth/auth.middleware");
const multer = require("multer");
const productMediaSchema = require("./schema/schema.product_media");
const productCategorySchema = require("./schema/schema.product_categoryId");
const optionalAuthMiddleware = require("../auth/optional.auth.middleware")


const storage = multer.memoryStorage();

module.exports = () => {
  router.post(
    "/",
    authMiddleware,
    productMiddleware.manipulate,
    async (req, res, next) => {
      await Promise.all(checkSchema(await productSchema?.generate(req)).map((chain) => chain.run(req)));
      next();
    },
    productController.add
  );

  router.get("/listing", productController.listing);
  router.post("/media", authMiddleware, multer({ storage: storage }).any(), checkSchema(productMediaSchema), productController.uploadMedia);
  router.post("/:id", productController.soldProduct)
  router.get("/", optionalAuthMiddleware, productController.getRandom)
  router.get("/category", authMiddleware, productController.searchCat)
  router.get("/:id", optionalAuthMiddleware, productController.findById);




  return router;
};
