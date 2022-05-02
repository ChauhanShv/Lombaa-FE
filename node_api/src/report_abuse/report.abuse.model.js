
const { Sequelize, DataTypes, Model } = require("sequelize");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const sequelize = require("../modules/sequelize").service;

class ReportAbuse extends Model { }

ReportAbuse.init(
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
        modelName: "reportAbuse",
        tableName: "report_abuse",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
ReportAbuse.belongsTo(User, { as: 'user' })
ReportAbuse.belongsTo(Product, { as: 'product' })
module.exports = ReportAbuse;
