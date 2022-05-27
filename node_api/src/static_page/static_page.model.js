const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class StaticPage extends Model { }


StaticPage.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },

    content: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },

    enabledAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},
    {
        modelName: "StaticPage",
        tableName: "static_pages",
        timestamps: true,
        sequelize,
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt", "enabledAt"] },
        },
    }
);

module.exports = StaticPage