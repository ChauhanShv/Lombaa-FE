const City = require("../city/city.model");
const Region = require("../region/region.model");
const Country = require("../country/country.model");
const Location = require("./location.model");

class LocationService {
  async cityExists(id) {
    return await City.count({ where: { id } });
  }

  async regionExists(id) {
    return await Region.count({ where: { id } });
  }

  async countryExists(id) {
    return await Country.count({ where: { id } });
  }

  async upsert(countryId, regionId, cityId) {
    return Location.findOne({ where: { countryId, regionId, cityId } }).then(function (location) {
      if (location) return location.update({ countryId, regionId, cityId });

      return Location.create({ countryId, regionId, cityId });
    });
  }
}

module.exports = LocationService;
