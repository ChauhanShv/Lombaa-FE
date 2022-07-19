const StaticPage = require("./static_page.model");
const { Op } = require("sequelize");

class StaticPageService {

    async getBySlug(slug) {
        return await StaticPage.findOne({ where: { slug: slug, enabledAt: { [Op.not]: null } } });
    }
}

module.exports = StaticPageService;