const { text } = require("express");
const { Sequelize, DataTypes, Model } = require("sequelize");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const Chat = require("./chat.model");
const sequelize = require("../modules/sequelize").service;

class ChatMessage extends Model { }

ChatMessage.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        modelName: "ChatMessage",
        tableName: "chat_messages",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
ChatMessage.belongsTo(Chat, { as: 'chat' })
ChatMessage.belongsTo(User, { as: "postedBy" })

module.exports = ChatMessage;
