const Field = require("./field.model");

class FieldService {

    async getByIds(ids) {
        return await Field.findAll({ where: { id: [ids] } });
    }
}

module.exports = FieldService;