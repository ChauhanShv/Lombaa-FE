const CategoryService = require("./category.service");
const categoryService = new CategoryService();
module.exports = {
    id: {
        notEmpty: {
            errorMessage: " category is required",
        },
        in: ['params'],
        custom: {
            options: async (id, { req, location, path }) => {
                if (!id && !categoryService.getCatDetails(id)) return Promise.reject(`Category does not exists`);
                return Promise.resolve();
            },
        },
    },
}