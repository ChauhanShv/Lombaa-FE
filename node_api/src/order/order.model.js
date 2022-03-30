
const { Sequelize, DataTypes, Model } = require("sequelize");
const Transaction = require("../transaction/transaction.model");
const User = require("../user/user.model");
const sequelize = require("../modules/sequelize").service;

class Order extends Model { }

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        itemName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: null
        },
        currency: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null
        },
    },

    {
        modelName: "Order",
        tableName: "orders",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
Order.belongsTo(User, { as: 'user' })
module.exports = Order;
