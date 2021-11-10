const userRouter = require("../user").router;
const productRouter = require("../product").router;
const countryRouter = require("../country").router;
const regionRouter = require("../region").router;
const cityRouter = require("../city").router;
const authRouter = require("../auth").router;
const categoryRouter = require("../category").router

const router = require("../modules/express").instance.Router();

module.exports = () => {
  router.use("/category", categoryRouter())
  router.use("/user", userRouter());
  router.use("/auth", authRouter());
  router.use("/product", productRouter());
  router.use("/location", countryRouter());
  router.use("/location/country", regionRouter());
  router.use("/location/country/region", cityRouter());
  return router;
};
