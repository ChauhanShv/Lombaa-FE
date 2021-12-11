const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;
const File = require('../file/file.model');
const FieldValue = require('../field_value/field_value.model');

class Field extends Model { }

Field.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        label: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
        },
        dataTypes: {
            type: DataTypes.ENUM({
                values: ["string", "boolean", "numeric"],
            }),
            allowNull: false,
        },
        fieldType: {
            type: DataTypes.ENUM({
                values: ['text', "textArea", "dropdown", "checkbox", "switch", 'tagView', 'email', 'date', 'price', 'title'],
            }),
            allowNull: true
        }
    },
    {
        modelName: "field",
        tableName: "fields",
        timestamps: true,
        sequelize,
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'iconId', 'category_field', 'deletedAt']
            },
            include: [
                { model: FieldValue, as: 'values' }
            ]
        }
    }
);

Field.belongsTo(File, { as: "icon" });
Field.hasMany(FieldValue, { as: 'values' });

module.exports = Field;