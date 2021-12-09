const Category = require("./category.model");

class CategoryService {

    async getById(id) {
        const data = await Category.scope(null).findAll({ where: { id: id } });
        console.log({ data });
        return data;
    }
}

module.exports = CategoryService;