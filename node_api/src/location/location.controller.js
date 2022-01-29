const BaseController = require("../modules/controller").base;
const City = require("../city/city.model");
const Region = require("../region/region.model");
const Country = require("../country/country.model");

const Location = require('./location.model');

class LocationController extends BaseController {
  constructor(...args) {
    super(...args);
  }

  getAll = async (req, res, next) => {
    try {
      const locations = await Location.findAll();
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved all locations",
          response: locations,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Failed to retrieve locations",
          messageDetail: error?.message
        },
      });
    }
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const location = await Location.findOne({ where: { id: id } });

      if (!location)
        throw new Error("Location not found");

      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved location",
          response: location,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Failed to retrieve location",
          messageDetail: error?.message
        },
      });
    }
  };

  getCitiesOfRegion = async (req, res, next) => {
    const { regionID } = req.params;
    try {
      const cities = await City.findAll({ where: { regionId: regionID } });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved all cities",
          response: cities,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Failed to retrieve cities",
          messageDetail: error?.message
        },
      });
    }
  };

  getRegionsOfCountry = async (req, res, next) => {
    const { countryID } = req.params;
    try {
      const regions = await Region.findAll({ where: { countryId: countryID } });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved all regions",
          response: regions,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Failed to retrieve regions",
          messageDetail: error?.message
        },
      });
    }
  };

  getCountries = async (req, res, next) => {
    try {
      const countries = await Country.findAll();
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved all countries",
          response: countries,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Failed to retrieve countries",
          messageDetail: error?.message
        },
      });
    }
  };

  getRegionsWithCities = async (req, res, next) => {
    try {
      const { countryID } = req.params;

      const regions = await Region.findAll({
        where: { countryId: countryID },
        include: [
          { model: City, as: "cities" },
        ],
      });

      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved all regions and cities",
          response: regions,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Failed to retrieve countries",
          messageDetail: error?.message
        },
      });
    }
  };

  getRegionsWithCitiesByCountryCode = async (req, res, next) => {
    try {
      const { countryCode } = req.params;

      const regions = await Region.findAll({
        include: [
          { model: Country, as: "country", where: { code: countryCode }, attributes: [] },
          { model: City, as: "cities" }
        ],
      });

      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved all regions and cities",
          response: regions,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Failed to retrieve countries",
          messageDetail: error?.message
        },
      });
    }
  };

}

module.exports = LocationController;
