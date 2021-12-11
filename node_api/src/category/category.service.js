const Category = require("./category.model");

class CategoryService {

    async getById(id) {
        const data = await Category.findByPk(id);
        return data;
    }

    async exists(id) {
        if (!id) return false;
        return !! await Category.count({ where: { id: id } });
    }
}

module.exports = CategoryService;