
const { Sequelize, DataTypes, Model } = require("sequelize");
const Order = require("../order/order.model");
const User = require("../user/user.model");
const sequelize = require("../modules/sequelize").service;

class Transaction extends Model { }

Transaction.init(
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
        status: {
            type: DataTypes.ENUM({
                values: ["initiated", "inprocess", "failed", "success"]
            }),
            allownull: true,
            defaultValue: null
        },
        referenceNumber: {
            type: DataTypes.INTEGER,
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
        modelName: "Transaction",
        tableName: "payment_transactions",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
Transaction.belongsTo(User, { as: 'user' })
Transaction.belongsTo(Order, { as: 'order' })
module.exports = Transaction;
