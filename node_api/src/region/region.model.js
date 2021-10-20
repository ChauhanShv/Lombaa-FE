const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const country = require("../country").model;

class Region extends Model {}

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
  { modelName: "region", tableName: "regions", timestamps: true, sequelize }
);
Region.belongsTo(country, { as: "country" });
module.exports = Region;
