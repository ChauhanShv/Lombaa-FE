const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const File = require("../file/file.model");

class ProductMedia extends Model {}

ProductMedia.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    modelName: "ProductMedia",
    tableName: "product_media",
    sequelize,
    paranoid: true,
  }
);

ProductMedia.belongsTo(File, { as: "file" });

module.exports = ProductMedia;
