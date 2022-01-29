const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class Settings extends Model { }

Settings.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        key_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    },
    {
        modelName: "Setting",
        tableName: "settings",
        timestamps: true,
        sequelize,
        paranoid: true,
    }
);


module.exports = Settings;