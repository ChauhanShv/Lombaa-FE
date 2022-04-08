const BaseController = require("../modules/controller").base;
const File = require("../file/file.model");
const Banner = require("./banner.model")
class BannerController extends BaseController {

    getBanner = async (req, res, next) => {
        try {
            const data = await Banner.findAll({ include: [{ model: File, as: 'media' }] })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Banners retreived", data: data } })
        }

        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to load Banners", message_details: error?.message } })
        }

    }
}
module.exports = BannerController