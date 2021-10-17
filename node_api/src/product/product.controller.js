const BaseController = require("../modules/controller").base;
const productModel = require("./product.model");
const { validationResult } = require("express-validator");
const { validationErrorFormatter } = require("../formater");

class productController extends BaseController {
  constructor(...args) {
    super(...args);
  }

  post = async (req, res, next) => {
    try {
      try {
        validationResult(req).formatWith(validationErrorFormatter).throw();
      } catch (error) {
        return res
          .status(422)
          .json(error.array({ onlyFirstError: true }))
          .end();
      }
      const value = req.body.data;
      const newProduct = await productModel.create(value);
      const addProduct = await newProduct.save();
      return super.jsonRes({ res, code: 200, data: addProduct });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 401,
        data: { msg: "invalid details" },
      });
    }
  };
}

module.exports = new productController();
