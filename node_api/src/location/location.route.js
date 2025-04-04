const router = require("../modules/express").instance.Router();
const LocationController = require("./location.controller");

const controller = new LocationController();

module.exports = () => {
  router.get("/", controller.getAll);


  router.get("/region/:regionID/cities", controller.getCitiesOfRegion);
  router.get("/country/:countryID/regions", controller.getRegionsWithCities);
  router.get("/country/code/:countryCode/regions", controller.getRegionsWithCitiesByCountryCode);
  router.get("/countries", controller.getCountries);
  router.get("/regions/cities", controller.getRegionsAndCities)

  router.get("/:id", controller.getById);
  return router;
};
