const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const City = require("../city/city.model");
const Region = require("../region/region.model");
const Country = require("../country/country.model");

class Location extends Model { }

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    }
  },
  {
    modelName: "location",
    tableName: "locations",
    timestamps: true,
    sequelize,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'cityId', 'regionId', 'countryId'] },
      include: [
        { model: City, as: "city" },
        { model: Region, as: "region" },
        { model: Country, as: "country" }
      ]
    }
  }
);

Location.belongsTo(City, { as: "city" });
Location.belongsTo(Region, { as: "region" });
Location.belongsTo(Country, { as: "country" });

module.exports = Location;
