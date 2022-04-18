const userRouter = require("../user").router;
const productRouter = require("../product").router;
const countryRouter = require("../country").router;
const regionRouter = require("../region").router;
const cityRouter = require("../city").router;
const authRouter = require("../auth").router;
const categoryRouter = require("../category").router;
const locationRouter = require('../location').router;
const chatRouter = require("../chat").router
const notificationRouter = require("../notification").router
const packageRouter = require("../packages").router
const transactionRouter = require("../transaction").router
const orderRouter = require("../order").router
const userPackageRouter = require("../user_package").router
const BannerRouter = require("../banner").router

const router = require("../modules/express").instance.Router();

module.exports = () => {
  router.use("/category", categoryRouter())
  router.use("/user", userRouter());
  router.use("/auth", authRouter());
  router.use("/product", productRouter());

  router.use("/locations", locationRouter());
  router.use("/chat", chatRouter())
  router.use("/notification", notificationRouter())
  router.use("/package", packageRouter())
  router.use("/transaction", transactionRouter())
  router.use("/order", orderRouter())
  router.use("/userPackage", userPackageRouter())
  router.use("/banner", BannerRouter())
  return router;
};
