const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class PageCategory extends Model { }


PageCategory.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
},
    {
        modelName: "PageCategory",
        tableName: "page_category",
        timestamps: true,
        sequelize,
        paranoid: true,
    }
);
module.exports = PageCategory