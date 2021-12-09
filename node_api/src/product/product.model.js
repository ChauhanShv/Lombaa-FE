const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const User = require("../user/user.model")
const Location = require("../location/location.model");
const Category = require("../category/category.model");
const ProductField = require("./product_field.model");

class Product extends Model { }

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },

    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isNegotiable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    buyerDoDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    condition: {
      type: DataTypes.ENUM({
        values: ["new", "old"],
      }),
      allowNull: true,
    },

    promoteType: {
      type: DataTypes.ENUM({ values: ["yes", "no"] }),
      allowNull: true,
    },

    dealMethod: {
      type: DataTypes.ENUM({ values: ["yes", "no"] }),
      allowNull: true,
    },

    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    postedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW(),
      allowNull: true,
    },

    soldAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    rejectedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    sequelize,
    paranoid: true,
  }
);

Product.belongsTo(Category, { as: 'category' });
Product.belongsTo(User, { as: 'user' });
Product.belongsTo(Location, { as: 'location' });
Product.hasMany(ProductField, { as: 'productField' })

module.exports = Product;
