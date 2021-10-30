const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class File extends Model { }

File.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        key_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        extension: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        mime: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        relative_path: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        absolute_path: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        location: {
            type: DataTypes.ENUM('s3', 'local'),
            allowNull: true,
            defaultValue: 'local'
        }
    },
    {
        modelName: "files",
        tableName: "files",
        timestamps: true,
        sequelize,
    }
);

module.exports = File