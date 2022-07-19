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
        optional: {
            options: { nullable: true },
        },
        in: ['query'],
        isFloat: true,
        toFloat: true
    },
    lng: {
        optional: {
            options: { nullable: true },
        },
        in: ['query'],
        isFloat: true,
        toFloat: true
    },
    radius: {
        optional: {
            options: { nullable: true },
        },
        in: ['query'],
        isInt: true,
        toInt: true
    },
}