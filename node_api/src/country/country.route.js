const router = require("../modules/express").instance.Router();
const countryController = require("./country.controller");

module.exports = () => {
  router.get("/country", countryController.getAll);
  return router;
};
