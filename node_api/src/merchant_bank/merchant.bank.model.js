
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class MerchantBank extends Model { }

MerchantBank.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        bank: {
            type: DataTypes.STRING(255),
            allownull: false
        },
        acct_name: {
            type: DataTypes.STRING(255),
            allownull: false
        },
        acct_number: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        acct_sort_code: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
    },

    {
        modelName: "MerchantBank",
        tableName: "merchant_bank",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
module.exports = MerchantBank;
