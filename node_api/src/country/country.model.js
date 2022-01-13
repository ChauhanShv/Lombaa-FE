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

    coordinate: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true,
    },

    phoneCode: {
      type: DataTypes.STRING(5),
      allowNull: true
    },

    currencySymbol: {
      type: DataTypes.STRING(10),
      allowNull: true
    },

    currencyCode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
  },
  {
    modelName: "country",
    tableName: "countries",
    timestamps: true,
    paranoid: true,
    sequelize,
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }
  }
);
module.exports = Country;
