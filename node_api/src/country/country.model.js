const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class country extends Model {}

country.init(
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
  { modelName: "country", tableName: "countries", timestamps: true, sequelize }
);
module.exports = country;
