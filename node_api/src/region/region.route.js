const router = require("../modules/express").instance.Router();
const regionController = require("./region.controller");

module.exports = () => {
  router.get("/:id/region", regionController.getAll);
  return router;
};
