const City = require('../city/city.model');
const Region = require('../region/region.model');
const Country = require('../country/country.model');
const Location = require('./location.model');

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

    async add(countryId, regionId, cityId) {
        return await Location.upsert({ countryId, regionId, cityId }, { returning: true });
    }
}

module.exports = LocationService;