const { Sequelize, DataTypes, Model } = require("sequelize");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const sequelize = require("../modules/sequelize").service;

class Chat extends Model { }

Chat.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
    },
    {
        modelName: "Chat",
        tableName: "chats",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
Chat.belongsTo(Product, { as: 'product' })
Chat.belongsTo(User, { as: 'buyer' })
Chat.belongsTo(User, { as: "seller" })

module.exports = Chat;
