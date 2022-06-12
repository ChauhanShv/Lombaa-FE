
const { Sequelize, DataTypes, Model } = require("sequelize");
const Order = require("../order/order.model")
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
        }
    },

    {
        modelName: "Invoice",
        tableName: "invoices",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
Invoice.belongsTo(Order, { as: 'order' })
module.exports = Invoice;
