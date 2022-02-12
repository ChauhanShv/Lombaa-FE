const Field = require("../field/field.model");
const Category = require("./category.model");

class CategoryService {

    async getById(id) {
        const data = await Category.findByPk(id, {
            include: [
                {
                    model: Field,
                    as: 'fields',
                    through: { attributes: [] },
                }
            ]
        });
        return data;
    }

    async exists(id) {
        if (!id) return false;
        return !! await Category.count({ where: { id: id } });
    }

    async getCatDetails(id) {
        if (!id) return false;
        return await Category.findOne({ where: { id: id } })
    }
}

module.exports = CategoryService;