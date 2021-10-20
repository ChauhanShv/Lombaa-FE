const router = require("../modules/express").instance.Router();
const cityController = require("./city.controller");

module.exports = () => {
  router.get("/city", cityController.getAll);
  return router;
};
