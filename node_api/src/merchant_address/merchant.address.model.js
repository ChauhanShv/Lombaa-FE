
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class MerchantAddress extends Model { }

MerchantAddress.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        address_line_1: {
            type: DataTypes.STRING(255),
            allownull: false
        },
        address_line_2: {
            type: DataTypes.STRING(255),
            allownull: true
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        postal_code: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },

    {
        modelName: "MerchantAddress",
        tableName: "merchant_address",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
module.exports = MerchantAddress;
