const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize/sequelize.service");
const Field = require('../field/field.model');
const FieldValue = require('../field_value/field_value.model');

class ProductField extends Model { }

ProductField.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },

        key: {
            type: DataTypes.STRING(255),
            defaultValue: null,
            allowNull: true
        },

        value: {
            type: DataTypes.STRING(255),
            defaultValue: null,
            allowNull: true
        }
    },
    {
        modelName: "ProductField",
        tableName: "product_fields",
        timestamps: false,
        sequelize
    }
);

ProductField.belongsTo(Field, { as: 'field' });
ProductField.belongsTo(FieldValue, { as: 'fieldValue' });

module.exports = ProductField;