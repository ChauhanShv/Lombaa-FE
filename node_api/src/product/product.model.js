const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const Location = require("../location/location.model");
const Category = require("../category/category.model");
const ProductField = require("./product_field.model");
const ProductMedia = require("./product_media.model");
const User = require("../user/user.model")

class Product extends Model { }

Product.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    slug: { type: DataTypes.STRING(255), allowNull: false },
    approvedAt: { type: DataTypes.DATE, allowNull: true },
    postedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW(), allowNull: true },
    soldAt: { type: DataTypes.DATE, allowNull: true },
    rejectedAt: { type: DataTypes.DATE, allowNull: true },
    rejectReason: { type: DataTypes.TEXT, allowNull: true },
    expiry: { type: DataTypes.DATE, allowNull: true },
    title: DataTypes.VIRTUAL,
    description: DataTypes.VIRTUAL,
    price: DataTypes.VIRTUAL,
    isFavorite: DataTypes.VIRTUAL,
  },
  {
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    sequelize,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt", "iconId", "deletedAt"],
      },
    },
  }
);

Product.belongsTo(Category, { as: "category" });
// Product.belongsTo(User, { as: "user" });
Product.belongsTo(Location, { as: "location" });
Product.hasMany(ProductField, { as: 'productFields', foreignKey: "productId" });
Product.hasMany(ProductMedia, { as: "productMedia", foreignKey: "productId" });
Product.belongsTo(User, { as: 'user' })
module.exports = Product;
