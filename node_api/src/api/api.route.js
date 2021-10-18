const userRouter = require("../user").router;
const productRouter = require("../product").router;

const router = require("../modules/express").instance.Router();

module.exports = () => {
  router.use("/user", userRouter());
  router.use("/product", productRouter());
  return router;
};
