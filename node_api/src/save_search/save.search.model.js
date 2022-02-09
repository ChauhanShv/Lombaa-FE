const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const User = require("../user/user.model")


class SaveSearch extends Model { }

SaveSearch.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    , {
        modelName: "SaveSearch",
        timestamps: true,
        tableName: "save_search",
        sequelize,
        paranoid: true,
    });

SaveSearch.belongsTo(User, { as: 'user' })


module.exports = SaveSearch;