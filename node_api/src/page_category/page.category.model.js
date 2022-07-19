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
        unique: true
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
},
    {
        modelName: "pageCategory",
        tableName: "page_category",
        timestamps: true,
        sequelize,
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt",],
            },
        },
    }
);

module.exports = PageCategory