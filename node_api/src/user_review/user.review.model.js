
const { Sequelize, DataTypes, Model } = require("sequelize");
const User = require("../user/user.model");
const sequelize = require("../modules/sequelize").service;

class UserReview extends Model { }

UserReview.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        }
    },

    {
        modelName: "userReview",
        tableName: "user_review",
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);
UserReview.belongsTo(User, { as: 'by' })
UserReview.belongsTo(User, { as: 'for' })
module.exports = UserReview;
