const CategoryService = require("./category.service");
const categoryService = new CategoryService();
module.exports = {
    id: {
        notEmpty: {
            errorMessage: "Category is required",
        },
        in: ['params'],
        custom: {
            options: async (id, { req, location, path }) => {
                if (! await categoryService.exists(id)) return Promise.reject(`Category does not exists`);
                return Promise.resolve();
            },
        },
    },
    lat: {
        notEmpty: {
            errorMessage: "Latitude is required"
        },
        in: ['query'],
        isFloat: true,
        toFloat: true
    },
    lng: {
        notEmpty: {
            errorMessage: "Longitude is required"
        },
        in: ['query'],
        isFloat: true,
        toFloat: true
    },
}