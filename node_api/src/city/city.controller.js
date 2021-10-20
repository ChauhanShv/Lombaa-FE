const BaseController = require("../modules/controller").base;
const cityModel = require("./city.model");
const region = require("../region").model;

class cityController extends BaseController {
  constructor(...args) {
    super(...args);
  }
  getAll = async (req, res, next) => {
    try {
      const allCity = await cityModel.findAll({
        include: [{ model: region, as: "region" }],
      });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "successfull loaded all city records",
          cities: allCity,
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
module.exports = new cityController();
