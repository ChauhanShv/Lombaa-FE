const Product = require("./product.model");
const { Op } = require("sequelize");
const moment = require("moment");
const Location = require("../location/location.model");

class ProductService {
  async isSlugAvailable(slug) {
    try {
      return !(await Product.count({ where: { slug } }));
    } catch (error) {
      return null;
    }
  }

  async getUserInReviewProducts(userId) {
    if (!userId) return [];

    return await Product.findAll({ where: { userId: userId, approvedAt: null, rejectedAt: null } });
  }

  async getUserActiveProducts(userId) {
    if (!userId) return [];

    return await Product.findAll({ where: { userId: userId, approvedAt: { [Op.not]: null }, soldAt: null, expiry: { [Op.lte]: moment() } } });
  }

  async getUserDeclinedProducts(userId) {
    if (!userId) return [];

    return await Product.findAll({ where: { userId: userId, rejectedAt: { [Op.not]: null } } });
  }

  async getUserExpiredProducts(userId) {
    if (!userId) return [];

    return await Product.findAll({ where: { userId: userId, expiry: { [Op.gt]: moment() }, soldAt: null } });
  }

  async getUserSoldProducts(userId) {
    if (!userId) return [];

    return await Product.findAll({ where: { userId: userId, soldAt: { [Op.not]: null } } });
  }

  async getproductByCategoryId(categoryId) {
    if (!categoryId) return [];
    return await Product.findAll({
      where: { categoryId: categoryId, approvedAt: { [Op.not]: null }, expiry: { [Op.lt]: moment() } },
      include: [{ model: Location, as: "location" }],
    })
  }
}

module.exports = ProductService;
