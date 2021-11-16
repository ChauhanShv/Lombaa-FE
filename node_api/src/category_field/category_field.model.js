const Category = require("../category/category.model");
const Field = require("../field/field.model");

Category.belongsToMany(Field, { through: 'category_field' });
Field.belongsToMany(Category, { through: 'category_field' });
