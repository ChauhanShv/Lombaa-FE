const BaseController = require("../modules/controller").base;
const regionModel = require("./region.model");
const country = require("../country").model;

class regionController extends BaseController {
  constructor(...args) {
    super(...args);
  }
  getAll = async (req, res, next) => {
    try {
      const allRegion = await regionModel.findAll({
        include: [{ model: country, as: "country" }],
      });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "successfull loaded all region records",
          region: allRegion,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 401,
        data: {
          message: "no match found",
        },
      });
    }
  };
}
module.exports = new regionController();
