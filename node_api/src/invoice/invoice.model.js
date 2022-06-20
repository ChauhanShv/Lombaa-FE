
const { Sequelize, DataTypes, Model } = require("sequelize");
const Order = require("../order/order.model");
const Package = require("../packages/packages.model");
const User = require("../user/user.model");
const sequelize = require("../modules/sequelize").service;

class Invoice extends Model { }

Invoice.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        invoiceNumber: {
            type: DataTypes.STRING(10),
            allownull: false
        },
        packageName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        packageDescription: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM({
                values: ["paid", "unpaid"],
            }),
            defaultValue: 'unpaid',
            allowNull: false,
        },
    },

    {
        modelName: "Invoice",
        tableName: "invoices",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
Invoice.belongsTo(User, { as: 'user' })
Invoice.belongsTo(Package, { as: "package" })
module.exports = Invoice;
