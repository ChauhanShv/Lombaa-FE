const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const region = require("../region").model;

class City extends Model {}

City.init(
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
  { modelName: "city", tableName: "cities", timestamps: true, sequelize }
);
City.belongsTo(region, { as: "region" });
module.exports = City;
