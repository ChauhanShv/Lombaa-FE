const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const File = require('../file/file.model');

class FieldValue extends Model { }

FieldValue.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        value: {
            type: DataTypes.STRING(),
            allowNull: true
        }
    },
    {
        modelName: "field_value",
        tableName: "field_values",
        timestamps: true,
        sequelize,
    }
);

FieldValue.belongsTo(File, { as: "icon" });

module.exports = FieldValue;