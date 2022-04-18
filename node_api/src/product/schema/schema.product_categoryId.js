const CategoryService = require("./../../category/category.service");
const categoryService = new CategoryService();
module.exports = {
    categoryId: {
        notEmpty: {
            errorMessage: " category is required",
        },
        custom: {
            options: async (id, { req, location, path }) => {
                if (!id && !categoryService.exists(id)) return Promise.reject(`Category does not exists`);
                return Promise.resolve();
            },
        },
    },
}