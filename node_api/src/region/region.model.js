const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const Country = require("../country/country.model");
const City = require("../city/city.model");

class Region extends Model { }

Region.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    modelName: "region",
    tableName: "regions",
    timestamps: true,
    sequelize,
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt', 'countryId'] } }
  }
);
Region.belongsTo(Country, { as: "country" });
Region.hasMany(City, { as: 'cities' });

module.exports = Region;
