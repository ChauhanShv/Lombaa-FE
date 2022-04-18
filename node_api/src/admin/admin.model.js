const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class AdminUser extends Model { }

AdminUser.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

    },
    {
        modelName: "AdminUser",
        tableName: "admin_user",
        timestamps: true,
        sequelize,
        paranoid: true,
    }
);


module.exports = AdminUser;