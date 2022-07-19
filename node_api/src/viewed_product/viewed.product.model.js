const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const User = require("../user/user.model")
const Product = require("../product/product.model")


class ViewedProduct extends Model { }

ViewedProduct.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },

    },
    {
        modelName: "viewedProduct",
        tableName: "viewed_products",
        timestamps: true,
        sequelize,
        paranoid: false,
    }

)
User.belongsToMany(Product, { through: ViewedProduct, foreignKey: "userId" });
Product.belongsToMany(User, { through: ViewedProduct, foreignKey: "productId" });

module.exports = ViewedProduct;