const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const Field = require("../field/field.model");


class RejectReason extends Model { }

RejectReason.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
    , {
        modelName: "RejectReason",
        timestamps: true,
        tableName: "reject_reasons",
        sequelize,
        paranoid: true,
    });


module.exports = RejectReason;