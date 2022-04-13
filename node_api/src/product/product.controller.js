const BaseController = require("../modules/controller").base;
const Product = require("./product.model");
const { validationResult } = require("express-validator");
const { validationErrorFormatter } = require("../formater");
const slugify = require("slugify");
const ProductService = require("./product.service");
const { v4: uuidv4 } = require("uuid");
const ProductField = require("./product_field.model");
const FileService = require("../file/file.service");
const jwt = require("../modules/jwt/jwt.service");
const ProductMedia = require("./product_media.model");
const LocationService = require("../location/location.service");
const Location = require("../location/location.model");
const User = require("../user/user.model");
const fileModel = require("../file/file.model")
const Field = require("../field/field.model")
const Category = require("../category/category.model")
const viewedProduct = require("../viewed_product/viewed.product.model")
const { Op, where } = require("sequelize");
const RejectReason = require("../reject_reason/reject_reason.model");
const { productId } = require("../chat/chat.schema");
const FavoriteProduct = require("../user/user.favorite_product_model");
const SettingService = require("../settings/settings.service");
const sequelize = require("../modules/sequelize/sequelize.service");




class ProductController extends BaseController {
  constructor(...args) {
    super(...args);
    this.service = new ProductService();
    this.fileService = new FileService();
    this.locationService = new LocationService();
    this.settingService = new SettingService()
  }

  add = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const data = {
        slug: await this.slugify(req?.body?.categoryFields?.find((field) => field.fieldType === "title")?.value?.value ?? uuidv4()),
        userId: req?.user?.id ?? null,
        categoryId: req.body.categoryId,
      };

      const { location } = req.body;

      let loc = null;
      if (location) loc = await this.locationService.upsert(location?.country, location?.region, location?.city);

      if (loc?.id) data.locationId = loc?.id;

      const p = await Product.create(data);

      let product = await Product.findOne({
        where: { id: p?.id },
        include: [{ model: Location, as: "location" }],
      });

      const productFieldData = req?.body?.fields?.map((field) => ({ fieldId: field?.id, value: field?.value?.value, fieldValueId: field?.value?.id, productId: product?.id }));
      await ProductField.bulkCreate(productFieldData);

      const mediaList = req.body?.media?.map((media) => ({ fileId: media?.fileId, productId: product?.id, isPrimary: media?.isPrimary ?? false }));

      await ProductMedia.bulkCreate(mediaList);

      return super.jsonRes({ res, code: 200, data: { success: true, message: "Product added", product: product } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, error: { code: 400, message: "Failed to post Ad", message_detail: error.message } } });
    }
  };

  uploadMedia = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }

    try {
      const user = req?.user;
      const buffer = req.files[0].buffer;

      const uploadedFile = await this.fileService?.upload(buffer, { saveToDB: true });

      const payload = { userId: user?.id, fileId: uploadedFile?.id };
      const token = jwt.encode(payload, "30d");

      return super.jsonRes({ res, code: 201, data: { success: true, message: "Uploaded", media: { token, url: uploadedFile?.absolute_path, mime: uploadedFile?.mime, extension: uploadedFile?.extension } } });
    } catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, error: { code: 400, message: "Failed to upload", message_detail: error.message } } });
    }
  };

  listing = async (req, res, next) => {
    try {
      const filters = req.body.data;
      const limit = filters.limit || 20;
      const offset = filters.offset ? filters.offset * limit : 0;
      const where = {};
      const Sequelize = require("sequelize");

      if (filters.categoryId?.length) where.category_Id = { [Op.in]: filters.categoryId };
      if (filters.title) where.title = { [Op.like]: `%${filters.title}%` };
      if (filters.slug) where.slug = { [Op.like]: `%${filters.slug}%` };
      if (filters.price?.from && filters.price?.to) where.price = { [Op.between]: [filters.price.from, filters.price.to] };
      if (filters.isNegotiable) where.isNegotiable = filters.isNegotiable;
      if (filters.isFree) where.isFree = filters.isFree;
      if (filters.condition) where.condition = filters.condition;
      if (filters.isApproved) where.isApproved = filters.isApproved;
      if (filters.isSold) [(where.isSold = filters.isSold)];

      const products = await Product.findAll({
        offset,
        limit,
        where,
        attributes: ["id", "title", "slug", "price", "isNegotiable", "description", "location", "isSold", "isApproved", "is_Free", "buyerDoDelivery"],
      });

      return super.jsonRes({
        res,
        code: 200,
        data: { success: true, messaage: "Product listed", products: products },
      });
    } catch (error) {
      return super.jsonRes({
        res,
        code: 401,
        data: { message: "Fail to load", messaage_detail: error?.messaage },
      });
    }
  };

  findById = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }
    try {
      const givenId = req.params.id;
      const userId = req.user?.id;
      let singleProduct = await Product.findOne({
        where: { [Op.or]: [{ id: givenId }, { slug: givenId }] },
        include: [
          { model: Category, as: "category" },
          { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
          { model: Location, as: "location" },
          { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
          { model: User, as: 'user', attributes: ["name", "profilePictureId", "email", "accountType", "locationId", "profileVerificationScore", "businessName", "createdAt", "showPhoneNumberConsent", "phoneNumber"], include: [{ model: fileModel, as: "profilePicture" }, { model: Location, as: "location" }] }
        ]
      });

      if (!singleProduct) {
        return super.jsonRes({ res, code: 200, data: { success: false, message: "Failed to get product", message_detail: "Product is unavailable" } })
      }
      if (userId) {
        singleProduct = (await this.service.mapUserFavorite([singleProduct], userId))?.[0];

        const viewed = viewedProduct.create({ userId: userId, productId: singleProduct.id })
      }
      const title = await this.service.fieldsMapping([singleProduct])
      if (!singleProduct?.user?.showPhoneNumberConsent) {
        singleProduct = await this.service.userPhone(singleProduct)
        return super.jsonRes({ res, code: 200, data: { success: true, messaage: "product retreived", product: singleProduct } })
      }
      return super.jsonRes({
        res,
        code: 200,
        data: {
          success: true,
          message: "Product retrieved.",
          product: singleProduct
        },
      });
    } catch (error) {
      return super.jsonRes({
        res,
        code: 401,
        data: { success: false, message: "Failed to get product details", messaage_detail: error?.message },
      });
    }
  };

  async slugify(text) {
    let counter = 0;
    let slug = "";

    do {
      slug = `${slugify(text, { replacement: "-", lower: true, trim: true })}${counter ? `-${counter}` : ""}`;
      counter++;
    } while (!(await this.service.isSlugAvailable(slug)));

    return slug;
  }

  soldProduct = async (req, res, next) => {
    try {
      const givenId = req.params?.id
      const soldService = await this.service.tickSoldProduct(givenId)
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Marked as sold" } })
    } catch (error) {
      super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to mark", message_detail: error?.message } })
    }
  }

  getRandom = async (req, res, next) => {
    try {
      const userId = req.user?.id
      let { lat, lng, radius = 2000 } = req.query
      let radiusValue = await this.settingService?.getInt('add_product_radius')
      if (radiusValue) {
        radius = radiusValue * 1000;
      }
      let randomProducts = await this.service.randomProducts(lat, lng, radius)
      if (userId) {
        randomProducts = await this.service.mapUserFavorite(randomProducts, userId)
      }
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Products retreived", product: randomProducts } })
    }
    catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "failed to get products", message_detail: error?.messaage } })
    }
  }

  searchCat = async (req, res, next) => {
    try {
      const search = req.query.search
      let searchCat = await this.service.search(search ?? '')
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Products retreived", products: searchCat } })
    }
    catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to load", message_detail: error?.messaage } })
    }
  }

  lookALike = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }
    try {
      const productId = req.params?.id
      const { offset = 0, limit = 15 } = req.query
      const product = await this.service.lookALikeProducts(productId, offset, limit)
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Products retreived", products: product } })

    }
    catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to load ", message_detail: error?.messaage } })

    }
  }
  delete = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const productId = req.body?.id
      const data = await this.service.delete(productId, userId)
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Product has been deleted" } })
    }
    catch (error) {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to delete product" } })
    }
  }
  getEdit = async (req, res, next) => {
    try {
      const productId = req.params?.id
      const data = await Product.findOne({
        where: { id: productId },
        include: [
          { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
          { model: Location, as: "location" },
          { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
          { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
          { model: Category, as: 'category' }
        ]
      })
      return super.jsonRes({ res, code: 200, data: { success: true, message: "Edit product retreived", data: data } })
    }
    catch {
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get product" } })
    }
  }
  edit = async (req, res, next) => {
    try {
      validationResult(req).formatWith(validationErrorFormatter).throw();
    } catch (error) {
      return res.status(422).json(error.array({ onlyFirstError: true }));
    }
    try {
      const productId = req.params?.id
      const data = await Product.findOne({
        where: { id: productId },
        include: [
          { model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] },
          { model: Location, as: "location" },
          { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] },
          { model: User, as: 'user', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
          { model: Category, as: 'category' }
        ]
      })
      const { location } = req.body;
      let loc = null;
      if (location) loc = await this.locationService.upsert(location?.country, location?.region, location?.city);


      const productFieldData = req?.body?.fields?.map((field) => ({ fieldId: field?.id, value: field?.value?.value, fieldValueId: field?.value?.id, productId: data?.id }));
      await ProductField.update(productFieldData, { where: { productId: data?.id } });
      const mediaList = req.body?.media?.map((media) => ({ fileId: media?.fileId, productId: data?.id, isPrimary: media?.isPrimary ?? false }));
      await ProductMedia.update(mediaList, { where: { productId: data?.id } });
      return super.jsonRes({ res, code: 200, data: { success: true, messaage: "Product has been edited" } })
    }
    catch (error) {
      console.log(error)
      return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to edit product" } })
    }
  }
}


module.exports = ProductController;
