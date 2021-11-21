const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class Country extends Model { }

Country.init(
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
    modelName: "country",
    tableName: "countries",
    timestamps: true,
    sequelize,
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
  }
);
module.exports = Country;
