
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class Package extends Model { }

Package.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
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
        type: {
            type: DataTypes.ENUM({
                values: ["booster", "premium"]
            }),
            allownull: true,
            defaultValue: null
        },
        validity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
    },

    {
        modelName: "Package",
        tableName: "packages",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = Package;
