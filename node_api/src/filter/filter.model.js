const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;


class Filter extends Model { }

Filter.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
        type: { type: DataTypes.STRING(30), allowNull: false }

    },
    {
        modelName: "Filter",
        tableName: "filters",
        timestamps: false,
        sequelize,
        paranoid: false,
    }

)

module.exports = Filter;