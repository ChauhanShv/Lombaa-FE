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

  async getproductByCategoryId(categoryId, sortby, sortorder) {
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

    products = this.fieldsMapping(products);

    if (sortby === 'price' && sortorder === 'asc') {
      products.sort(function (x, y) {
        let a = x.price
        let b = y.price
        return +b.price - +a.price
      })
    }
    if (sortby === 'price' && sortorder === 'dsc') {
      products.sort(function (x, y) {
        let a = x.price
        let b = y.price
        return +a.price - +b.price
      })
    }
    if (sortby === 'postedAt' && sortorder === 'asc') {
      products.sort(function (x, y) {
        let a = new Date(x.postedAt)
        b = new Date(y.postedAt);
        return a - b;
      });
      if (sortby === 'postedAt' && sortorder === 'dsc') {
        products.sort(function (x, y) {
          let a = new Date(x.postedAt)
          b = new Date(y.postedAt);
          return b - a;
        });
      }
    }
    return products


  }

  fieldsMapping(products) {
    return products.map(product => {
      product.title = product.productFields.find(productField => productField?.field?.fieldType === 'title')?.value ?? null;
      product.price = product.productFields.find(productField => (productField?.field?.fieldType === 'price'))?.value ?? null;
      product.description = product.productFields.find(productField => (productField?.field?.fieldType === 'description'))?.value ?? null;

      return product;
    });
  }

  async tickSoldProduct(givenId) {
    const data = await Product.update({ soldAt: moment() }, { where: { id: givenId } })
    return data

  }

}


module.exports = ProductService;
