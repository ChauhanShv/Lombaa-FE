const userRouter = require("../user").router;
const productRouter = require("../product").router;
const countryRouter = require("../country").router;
const regionRouter = require("../region").router;
const cityRouter = require("../city").router;
const authRouter = require("../auth").router;
const categoryRouter = require("../category").router;
const locationRouter = require('../location').router;
const chatRouter = require("../chat").router

const router = require("../modules/express").instance.Router();

module.exports = () => {
  router.use("/category", categoryRouter())
  router.use("/user", userRouter());
  router.use("/auth", authRouter());
  router.use("/product", productRouter());

  router.use("/locations", locationRouter());
  router.use("/chat", chatRouter())

  return router;
};
