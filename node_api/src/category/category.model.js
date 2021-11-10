const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const File = require('../file/file.model')

class Category extends Model { }

Category.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isPopular: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
    },
    {
        modelName: "category",
        tableName: "category",
        timestamps: true,
        sequelize,
    }
);
Category.belongsTo(File, { as: "icon" });
Category.belongsTo(Category, { as: "parent" });

module.exports = Category