const BaseController = require("../modules/controller/controller.base");
const StaticPageService = require("./static_page.service");

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
}

module.exports = StaticPageController;