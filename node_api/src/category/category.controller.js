const BaseController = require("../modules/controller").base;
const Category = require("./category.model");
const File = require("../file/file.model");
const Field = require("../field/field.model");
const ProductService = require("../product/product.service")
const CategoryService = require("./category.service")

const { validationResult } = require("express-validator");
const { validationErrorFormatter } = require("../formater");
const SettingService = require("../settings/settings.service");

class CategoryController extends BaseController {
  constructor() {
    super();
    this.productService = new ProductService()
    this.service = new CategoryService()
    this.settingService = new SettingService()
  }
  async categories(req, res, next) {
    try {
      const data = await Category.findAll({
        where: { parentId: null },
        include: [
          { model: File, as: "icon" },
          { model: Field, as: "fields" },
          {
            model: Category,
            as: "subCategories",
            include: [
              { model: File, as: "icon" },
              { model: Field, as: "fields" },
            ],
          },
        ],
      });
      const value = {
        success: true,
        code: 200,
        message: "Site attributes list fetched successfully",
        response: data,
      };
      return super.jsonRes({ res, code: 200, data: value });
    } catch (error) {
      const value = { success: false, message: "Failed to retrieve categories", messageDetail: error?.message };
      return super.jsonRes({ res, code: 400, data: value });
    }
  }

  async add(req, res, next) {
    try {
      const data = req.body;
      const value = await Category.create(data);
      const value1 = await value.save();
      return super.jsonRes({ res, code: 200, message: "hii" });
    } catch {
      return super.jsonRes({ res, code: 400, message: "bye" });
    }
  }

  getProducts = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const catId = req.params?.id
      let { sortby, sortorder, filter, search, lat, lng, radius = 20000, offset = 0, limit = 10, price } = req.query;
      let radiusValue = await this.settingService?.getInt('add_product_radius')
      if (radiusValue) {
        radius = radiusValue * 1000;
      }
      const userId = req.user?.id
      const allProducts = await this.productService?.getproductByCategoryId(catId, sortby, sortorder, userId, filter, search, lat, lng, radius, offset, limit, price);
      const catdetail = await this.service?.getCatDetails(catId);
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Products retrieved",
          data: { products: allProducts, category: catdetail }

        }
      })
    } catch (error) {
      return super.jsonRes({
        res,
        code: 400,
        data: {
          message: "Fail to get data",
          message_detail: error?.message
        }
      })
    }
  }

}

module.exports = CategoryController;
