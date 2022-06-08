
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
const Sequelize = require("sequelize");
const City = require("../city/city.model");
const Country = require("../country/country.model");
const Region = require("../region/region.model");
const sequelize = require("../modules/sequelize/sequelize.service");
const { categoryId } = require("./schema/schema.product_categoryId");

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
      where: { userId: userId, approvedAt: { [Op.not]: null }, soldAt: null, expiry: { [Op.gte]: moment() } }, include: [
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

  async getproductByCategoryId(categoryId, sortby, sortorder, userId, filter, search, lat, lng, radius, offset, limit, price) {
    if (!categoryId) return [];
    let whereCondition = { categoryId: categoryId, approvedAt: { [Op.not]: null }, expiry: { [Op.gt]: moment() } }
    if (userId) {
      whereCondition.userId = { [Op.not]: userId }
    }

    let precisenessCondition;
    if (lat && lng) {
      precisenessCondition = {
        where:
          sequelize.where(sequelize.fn('ST_Distance_Sphere', sequelize.literal('coordinate'), sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`)), { [Op.lte]: radius })
      }
    }

    let products = await Product.findAll({
      where: whereCondition,
      include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        {
          model: Location.unscoped(), required: true, as: "location", include: [
            {
              model: City, as: 'city', where: precisenessCondition?.where ?? true
            },
            { model: Country, as: 'country' },
            { model: Region, as: 'region' }]
        },
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
        let b = new Date(y.postedAt);
        return a - b;
      });
      if (sortby === 'posted_at' && sortorder === 'desc') {
        products.sort(function (x, y) {
          let a = new Date(x.postedAt)
          let b = new Date(y.postedAt);
          return b - a;
        });
      }
    }
    let offsetValue = offset
    if (offset === limit) {
      offsetValue = 0
    }

    products = products.slice(offsetValue, limit)
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
        return product?.title?.toLowerCase().includes(search) || product?.description?.toLowerCase().includes(search)
      })
    }
    if (price) {
      const priceText = price
      const minMax = priceText.split(',')
      const min = parseFloat(minMax[0])
      const max = parseFloat(minMax[1])


      products = products.filter(product => {
        return product?.price >= min && product?.price <= max

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

  async userPhone(singleProduct) {
    // return singleProduct = singleProduct.map(product => {
    //   product.user = { name: product.user.name }
    //   return product
    // })

    singleProduct.setDataValue('user', {
      name: singleProduct?.user?.name,
      profilePictureId: singleProduct?.user?.profilePictureId,
      email: singleProduct?.user?.email,
      accountType: singleProduct?.user?.accountType,
      locationId: singleProduct?.user?.locationId,
      profileVerificationScore: singleProduct?.user?.profileVerificationScore,
      businessName: singleProduct?.user?.businessName,
      createdAt: singleProduct?.user?.createdAt,
      showPhoneNumberConsent: singleProduct?.user?.showPhoneNumberConsent,
      profilePicture: singleProduct?.user?.profilePicture,
      location: singleProduct?.user?.location
    })
    return singleProduct;
  }
  // isFavorite(productId, userId) {
  //   return this.userService?.alreadyInFavorites(userId, productId) ?? false
  // }
  async tickSoldProduct(givenId) {
    const data = await Product.update({ soldAt: moment() }, { where: { id: givenId } })
    return data
  }

  async randomProducts(lat, lng, radius) {

    let precisenessCondition;
    if (lat && lng) {
      precisenessCondition = {
        where:
          sequelize.where(sequelize.fn('ST_Distance_Sphere', sequelize.literal('coordinate'), sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`)), { [Op.lte]: radius })
      }
    }
    let randomProducts = await Product.findAll({
      where: { approvedAt: { [Op.not]: null }, expiry: { [Op.gt]: moment() } },
      order: Sequelize.literal('rand()'), limit: 20, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        {
          model: Location.unscoped(), as: "location", include: [
            {
              model: City, as: 'city', where: precisenessCondition?.where ?? true
            },
            { model: Country, as: 'country' },
            { model: Region, as: 'region' }]
        },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category' }
      ]
    });
    randomProducts = this.fieldsMapping(randomProducts);

    return randomProducts
  }

  async search(search) {
    if ((search?.length ?? 0) < 2) { return [] }

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
      return product?.title?.toLowerCase().includes(search) || product?.description?.toLowerCase().includes(search)
    })
    products = products.map(product => {
      return product
    })
    function getArray(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    }
    products = getArray(products, 'id')
    return products


  }

  async lookALikeProducts(productId, offset, limit) {
    let products = await Product.findOne({
      where: { id: productId }
    })
    let productsFromCategory = await Product.findAll({
      where: { categoryId: products.categoryId }, include: [
        { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
        { model: Location, as: "location" },
        { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
        { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
        { model: Category, as: 'category', attributes: ["id", "name"] }
      ]
    })
    productsFromCategory = productsFromCategory.slice(offset, limit)
    productsFromCategory = this.fieldsMapping(productsFromCategory)

    if (productsFromCategory.length < 4) {
      return []
    }
    return productsFromCategory
  }

  async delete(productId, userId) {
    return await Product.destroy({ where: { id: productId, userId: userId } })
  }

}
module.exports = ProductService;
