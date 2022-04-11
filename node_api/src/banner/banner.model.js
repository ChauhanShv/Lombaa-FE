const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize/sequelize.service");
const File = require("../file/file.model");


class Banner extends Model { }

Banner.init(
    {
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        action_label: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        action: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        action_type: {
            type: DataTypes.ENUM({ values: ['in-site-url', 'ext-site-url'] }),
            allowNull: false
        }

    },
    {
        modelName: "Banner",
        tableName: "banners",
        timestamps: true,
        sequelize,
        paranoid: true,

    }
);

Banner.belongsTo(File, { as: "media" });
module.exports = Banner;
