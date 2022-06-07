
const { Sequelize, DataTypes, Model } = require("sequelize");
const Chat = require("../chat/chat.model")
const User = require("../user/user.model");
const sequelize = require("../modules/sequelize").service;

class ChatReportAbuse extends Model { }

ChatReportAbuse.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
    },

    {
        modelName: "chatReportAbuse",
        tableName: "chat_report_abuse",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
ChatReportAbuse.belongsTo(User, { as: 'user' })
ChatReportAbuse.belongsTo(Chat, { as: 'chat' })
module.exports = ChatReportAbuse;
