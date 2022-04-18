
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const User = require("../user/user.model");

class Notification extends Model { }

Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        text: {
            type: DataTypes.STRING(255),
            allownull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.TEXT,
            allownull: true,
            defaultValue: null
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        seenAt: {
            type: DataTypes.DATE,
            allownull: true,
            defaultValue: null
        },
        type: {
            type: DataTypes.ENUM({
                values: ["chat", "payment", "info"]
            }),
            allownull: true,
            defaultValue: null
        }
    },

    {
        modelName: "Notification",
        tableName: "notifications",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
Notification.belongsTo(User, { as: "user" })

module.exports = Notification;
