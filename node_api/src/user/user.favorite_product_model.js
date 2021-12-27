const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const User = require("./user.model");
const Product = require("../product/product.model");

class FavoriteProduct extends Model {}

FavoriteProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
  },
  {
    modelName: "FavoriteProduct",
    tableName: "favorite_products",
    timestamps: false,
    sequelize,
  }
);

User.belongsToMany(Product, { through: FavoriteProduct, foreignKey: "userId" });
Product.belongsToMany(User, { through: FavoriteProduct, foreignKey: "productId" });
Product.belongsTo(User, { as: "user" });

module.exports = FavoriteProduct;
