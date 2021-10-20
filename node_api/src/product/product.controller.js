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
      const Product = await newProduct.save();
      return super.jsonRes({
        res,
        code: 200,
        data: {
          Success: true,
          message: "Product added successfull",
          Product: Product,
        },
      });
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
    try {
      const filters = req.body.data;
      const limit = filters.limit || 20;
      const offset = filters.offset ? filters.offset * limit : 0;
      const where = {};
      const Sequelize = require("sequelize");
      const Op = Sequelize.Op;
      if (filters.categoryId?.length) {
        where.category_Id = {
          [Op.in]: filters.categoryId,
        };
      }
      if (filters.title) {
        where.title = {
          [Op.like]: `%${filters.title}%`,
        };
      }
      if (filters.slug) {
        console.log(filters.slug);
        where.slug = {
          [Op.like]: `%${filters.slug}%`,
        };
      }

      if (filters.price?.from && filters.price?.to) {
        where.price = {
          [Op.between]: [filters.price.from, filters.price.to],
        };
      }
      if (filters.isNegotiable) {
        where.isNegotiable = filters.isNegotiable;
      }
      if (filters.isFree) {
        where.isFree = filters.isFree;
      }
      if (filters.condition) {
        where.condition = filters.condition;
      }
      if (filters.isApproved) {
        where.isApproved = filters.isApproved;
      }
      if (filters.isSold) [(where.isSold = filters.isSold)];

      const products = await productModel.findAll({
        offset,
        limit,
        where,
        attributes: [
          "id",
          "title",
          "slug",
          "price",
          "isNegotiable",
          "description",
          "location",
          "isSold",
          "isApproved",
          "is_Free",
          "buyerDoDelivery",
        ],
      });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          Success: true,
          Messaage: "Product listing successfull",
          products: products,
        },
      });
    } catch (error) {
      console.log(error);
      return super.jsonRes({
        res,
        code: 401,
        data: { message: "fail to load products" },
      });
    }
  };
  findById = async (req, res, next) => {
    try {
      const Op = require("sequelize");
      const givenId = req.params.id;
      const singleProduct = await productModel.findOne({
        where: { id: givenId, isApproved: 0 },
      });
      return super.jsonRes({
        res,
        code: 200,
        data: {
          Success: true,
          Message: "product by id successfull",
          Product: singleProduct,
        },
      });
    } catch {
      return super.jsonRes({
        res,
        code: 401,
        data: {
          message: "no data found",
        },
      });
    }
  };
}

module.exports = new productController();
