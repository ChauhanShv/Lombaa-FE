const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const SaveSearch = require("../save_search/save.search.model")


class SaveSearchFilter extends Model { }

SaveSearchFilter.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        values: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    , {
        modelName: "SaveSearchFilter",
        timestamps: true,
        tableName: "save_search_filter",
        sequelize,
        paranoid: true,
    }
);

SaveSearch.hasMany(SaveSearchFilter, { as: "savesearchfilter" })



module.exports = SaveSearchFilter;