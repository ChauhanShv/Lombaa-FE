const BaseController = require("../modules/controller/controller.base");
const StaticPageService = require("./static_page.service");
const PageCategory = require("../page_category/page.category.model")
const StaticPage = require("../static_page/static_page.model")

class StaticPageController extends BaseController {

    constructor() {
        super();
        this.service = new StaticPageService();
        console.log(this.service);
    }

    getBySlug = async (req, res) => {
        try {
            const page = await this.service.getBySlug(req?.params?.slug)
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Static page retreived", data: page } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to load page", message_details: error?.message } })
        }
    }

    getCategory = async (req, res) => {
        try {
            let pageCategories = await PageCategory.findAll({ include: [{ model: StaticPage, as: "pages" }] })

            return super.jsonRes({ res, code: 200, data: { success: true, message: "page category retreived", data: { categories: pageCategories } } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to load page", message_details: error?.message } })
        }
    }
}

module.exports = StaticPageController;