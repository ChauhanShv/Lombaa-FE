const { Model, DataTypes } = require("sequelize");
const Category = require("../category/category.model");
const sequelize = require("../modules/sequelize").service;
const Field = require("../field/field.model");


class CategoryField extends Model { }

CategoryField.init(
    {
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }
    , {
        modelName: "category_field",
        timestamps: false,
        tableName: "category_fields",
        sequelize,
        paranoid: true,
    });

Category.belongsToMany(Field, { through: CategoryField });
Field.belongsToMany(Category, { through: CategoryField });

module.exports = CategoryField;
