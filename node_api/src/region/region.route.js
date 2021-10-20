const router = require("../modules/express").instance.Router();
const regionController = require("./region.controller");

module.exports = () => {
  router.get("/regions", regionController.getAll);
  return router;
};
