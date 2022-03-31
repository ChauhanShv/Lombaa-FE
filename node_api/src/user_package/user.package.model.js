
const { Sequelize, DataTypes, Model } = require("sequelize");
const Order = require("../order/order.model");
const User = require("../user/user.model");
const Package = require("../packages/packages.model")
const sequelize = require("../modules/sequelize").service;

class UserPackage extends Model { }

UserPackage.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
    },

    {
        modelName: "userPackage",
        tableName: "user_packages",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
UserPackage.belongsTo(User, { as: 'user' })
UserPackage.belongsTo(Order, { as: 'order' })
UserPackage.belongsTo(Package, { as: 'package' })
module.exports = UserPackage;
