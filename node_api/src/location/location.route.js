const router = require("../modules/express").instance.Router();
const LocationController = require("./location.controller");

const controller = new LocationController();

module.exports = () => {
  router.get("/", controller.getAll);


  router.get("/region/:regionID/cities", controller.getCitiesOfRegion);
  router.get("/country/:countryID/regions", controller.getRegionsOfCountry);
  router.get("/countries", controller.getCountries);

  router.get("/:id", controller.getById);
  return router;
};
