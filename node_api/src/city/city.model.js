const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class City extends Model { }

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
  {
    modelName: "city",
    tableName: "cities",
    timestamps: true,
    paranoid: true,
    sequelize,
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt', 'regionId'] } }
  }
);

module.exports = City;
