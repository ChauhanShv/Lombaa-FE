const BaseController = require("../modules/controller").base;
const countryModel = require("./country.model");
const { validationResult } = require("express-validator");
const { validationErrorFormatter } = require("../formater");
const Filter = require("../filter/filter.model")

class countryController extends BaseController {
  constructor(...args) {
    super(...args);
  }
  getAll = async (req, res, next) => {
    try {
      const allCountry = await countryModel.findAll();
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "successfull loaded all country records",
          countries: allCountry,
        },
      });
    } catch (error) {
      return super.jsonRes({
        res,
        code: 401,
        data: {
          message: "Failed to get data ",
          message_details: error?.message
        },
      });
    }
  };
}
module.exports = new countryController();
