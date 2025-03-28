const BaseController = require("../modules/controller").base;
const City = require("../city/city.model");
const Region = require("../region/region.model");
const Country = require("../country/country.model")
const config = require("./location.config")

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
      const countryCode = config.countryCode;

      let country = await Country.findOne({
        where: { code: countryCode },
        include: [
          { model: Region, as: "regions", include: [{ model: City, as: "cities" }] },
        ]
      });
      return super.jsonRes({

        res,
        code: 200,
        data: {
          success: true,
          message: "Retrieved all regions and cities",
          response: country,
        },
      });
    } catch (error) {
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

  getRegionsAndCities = async (req, res, next) => {
    try {
      let regionsAndCities = await Region.findAll({ include: [{ model: City, as: "cities" }] })
      regionsAndCities = regionsAndCities.map(region => {
        return region.cities.map(city => {
          return { regionId: region.id, regionName: region.name, cityId: city.id, cityName: city.name, cityCoordinate: city.coordinate, title: `${city.name} in ${region.name}` }
        })
      })

      return super.jsonRes({ res, code: 200, data: { success: true, message: "Retrieved all regions and cities", response: regionsAndCities } })
    }
    catch (error) {
      return super.jsonRes({ res, code: 400, success: false, message: "Failed to retrieve regions and cities", messageDetail: error?.message })
    }
  }

}

module.exports = LocationController;
