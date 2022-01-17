const Product = require("./product.model");
const { Op } = require("sequelize");
const moment = require("moment");
const Location = require("../location/location.model");
const ProductField = require("../product/product_field.model");
const ProductMedia = require("./product_media.model")
const Field = require("../field/field.model");
const User = require("../user/user.model")
const fileModel = require("../file/file.model")

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
    let products = await Product.findAll({
      where: { categoryId: categoryId, approvedAt: { [Op.not]: null }, expiry: { [Op.gt]: moment() } },
      include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] }
      ]
    });


    products = products.map(product => {
      const fieldArray = ['title', 'description', 'price']
      product.title = product.productFields.find(productField => fieldArray.includes(productField?.field?.fieldType))?.value ?? null;
      // product.setDataValue('title', title);

      return product;
    });

    return products;
  }
}

module.exports = ProductService;
