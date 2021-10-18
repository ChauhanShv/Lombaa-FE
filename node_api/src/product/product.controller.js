const BaseController = require("../modules/controller").base;
const productModel = require("./product.model");
const { validationResult } = require("express-validator");
const { validationErrorFormatter } = require("../formater");

class productController extends BaseController {
  constructor(...args) {
    super(...args);
  }

  add = async (req, res, next) => {
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
  listing = async (req, res, next) => {
    const filters = req.body.data;
    const limit = filters.limit || 20;
    const offset = filters.offset ? filters.offset * limit : 0;
    const where = {};
    if (filters.categoryId?.length) {
      where.category_Id = {
        in: filters.categoryId,
      };
    }
    if (filters.title.length) {
      const Sequelize = require("sequelize");
      const op = Sequelize.op;
      where.title = {
        like: `%${filters.title}%`,
      };
    }

    const products = await productModel.findAll({ offset, limit, where });
    return super.jsonRes({ res, code: 200, data: products });
  };

  listing1 = async (req, res, next) => {
    try {
      const value = req.body.data;
      console.log(value);
      if (!value) {
        try {
          const first20 = await productModel.findAll({ limit: 20 });
          return super.jsonRes({ res, code: 200, data: first20 });
        } catch (error) {
          console.log(error);
          return super.jsonRes({
            res,
            code: 200,
            data: { msg: "invalid details" },
          });
        }
      } else {
        const dataOffset = value.offset;
        const limit = 20;
        const offset = (dataOffset - 1) * limit;
        const offsetProduct = await productModel.findAll({ offset });
        return super.jsonRes({
          res,
          code: 200,
          data: { offsetProduct },
        });
      }
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 200,
        data: { msg: "invalid details" },
      });
    }
  };
}

module.exports = new productController();
