const Product = require("./product.model");
const { Op } = require("sequelize");
const moment = require("moment");
const Location = require("../location/location.model");
const ProductField = require("../product/product_field.model");
const ProductMedia = require("./product_media.model")
const Field = require("../field/field.model");
const User = require("../user/user.model")
const fileModel = require("../file/file.model");
const UserService = require("../user/user.service");
const Category = require("../category/category.model")
const Sequelize = require("sequelize")
class ProductService {
  constructor() {
    this.userService = new UserService()
  }
  async isSlugAvailable(slug) {
    try {
      return !(await Product.count({ where: { slug } }));
    } catch (error) {
      return null;
    }
  }

  async getUserInReviewProducts(userId) {
    if (!userId) return [];

    let products = await Product.findAll({
      where: { userId: userId, approvedAt: null, rejectedAt: null }, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category' }
      ]
    });

    products = this.fieldsMapping(products);

    return products

  }

  async getUserActiveProducts(userId) {
    if (!userId) return [];

    let products = await Product.findAll({
      where: { userId: userId, approvedAt: { [Op.not]: null }, soldAt: null, expiry: { [Op.lte]: moment() } }, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category' }
      ]
    });
    products = this.fieldsMapping(products)

    return products
  }

  async getUserDeclinedProducts(userId) {
    if (!userId) return [];

    let products = await Product.findAll({
      where: { userId: userId, rejectedAt: { [Op.not]: null } }, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category' }
      ]
    });
    products = this.fieldsMapping(products)

    return products
  }

  async getUserExpiredProducts(userId) {
    if (!userId) return [];

    let products = await Product.findAll({
      where: { userId: userId, expiry: { [Op.lt]: moment() }, soldAt: null }, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category' }
      ]
    });
    products = this.fieldsMapping(products)

    return products
  }

  async getUserSoldProducts(userId) {
    if (!userId) return [];

    let products = await Product.findAll({
      where: { userId: userId, soldAt: { [Op.not]: null } }, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category' }
      ]
    });
    products = this.fieldsMapping(products)

    return products
  }

  async getproductByCategoryId(categoryId, sortby, sortorder, userId, filter, search) {
    if (!categoryId) return [];
    let whereCondition = { categoryId: categoryId, approvedAt: { [Op.not]: null }, expiry: { [Op.gt]: moment() } }
    if (userId) {
      whereCondition.userId = { [Op.not]: userId }
    }
    console.log(whereCondition, 'guwfytafgyfaeytfgjhafyg')
    let products = await Product.findAll({
      where: whereCondition,
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
    if (sortby === 'price' && sortorder === 'desc') {
      products.sort(function (x, y) {
        let a = x?.price
        let b = y?.price
        return +a?.price - +b?.price
      })
    }
    if (sortby === 'posted_at' && sortorder === 'asc') {
      products.sort(function (x, y) {
        let a = new Date(x.postedAt)
        b = new Date(y.postedAt);
        return a - b;
      });
      if (sortby === 'posted_at' && sortorder === 'desc') {
        products.sort(function (x, y) {
          let a = new Date(x.postedAt)
          b = new Date(y.postedAt);
          return b - a;
        });
      }
    }
    if (filter) {

      const filterText = filter

      const filterFieldsSeperator = '|'
      const filterDataSeperator = '$'
      const filterValueSeperator = ','

      const filters = filterText.split(filterFieldsSeperator)

      let filterObj = {}

      const data = filters.forEach((filter, i) => {
        const filterData = filter.split(filterDataSeperator)
        filterObj[filterData[0]] = filterData[1].split(filterValueSeperator);

      })


      products = products.filter(product => {
        return !!product.productFields.find(productField => productField?.field?.fieldType === 'dropdown' && (filterObj[productField?.field?.label] ?? []).includes(productField?.value));
      });
    }

    if (search) {
      products = products.filter(product => {
        return product?.title?.includes(search) || product?.description?.includes(search)
      })
    }
    if (userId) {
      products = this.mapUserFavorite(products, userId)
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

  mapUserFavorite(products, userId) {
    return Promise.all(products.map(async product => {
      const productId = product.id
      product.isFavorite = await this.userService?.alreadyInFavorites(userId, productId) ?? false
      return product;
    }));
  }

  async tickSoldProduct(givenId) {
    const data = await Product.update({ soldAt: moment() }, { where: { id: givenId } })
    return data

  }

  async randomProducts() {
    let randomProducts = await Product.findAll({
      order: Sequelize.literal('rand()'), limit: 20, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category' }
      ]
    });
    randomProducts = this.fieldsMapping(randomProducts);

    return randomProducts
  }

  async search(search) {
    let products = await Product.findAll({
      include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category', attributes: ["id", "name"] }
      ]
    })
    products = this.fieldsMapping(products)
    products = products.filter(product => {
      return product?.title?.includes(search) || product?.description?.includes(search)
    })
    return products


  }
}


module.exports = ProductService;
