const CategoryService = require("../category/category.service");
const { isDate } = require("../modules/validator");
const jwt = require("../modules/jwt/jwt.service");

const categoryService = new CategoryService();

exports.generate = async (req) => {
  const schema = {
    categoryId: {
      notEmpty: {
        errorMessage: "Category is required",
      },
      custom: {
        options: async (id, { req, location, path }) => {
          if (!id && !categoryService.exists(id)) return Promise.reject(`Category does not exists`);
          return Promise.resolve();
        },
      },
    },

    "media.*": {
      notEmpty: {
        errorMessage: "Category is required",
      },
      custom: {
        options: async (media, { req, location, path }) => {
          const { userId } = jwt.decode(media?.token);
          if (userId !== req.user.id) return Promise.reject("Invalid media token");
          Promise.resolve();
        },
      },
      customSanitizer: {
        options: async (media, { req, location, path }) => {
          const { fileId, userId } = jwt.decode(media?.token);
          return { token: media?.token, fileId, userId };
        },
      },
    },
  };

  if (!req?.body?.categoryId) return schema;

  const category = await categoryService.getById(req?.body?.categoryId);
  if (!category) return schema;

  const categoryFields = category?.fields;

  req.body.categoryFields = categoryFields;

  categoryFields?.forEach((field) => {
    const fieldValidation = {};

    const fieldType = field?.fieldType?.toLowerCase();
    const dataType = field?.dataTypes?.toLowerCase();
    const fieldLabel = field?.label;

    if (field?.isRequired) {
      fieldValidation["notEmpty"] = {
        errorMessage: `${fieldLabel} is required`,
      };
    }

    if (fieldType === "email") {
      fieldValidation["isEmail"] = {
        errorMessage: "Email address is invalid",
      };
    }

    if (fieldType === "date") {
      fieldValidation["custom"] = {
        options: async (value, { req, location, path }) => {
          if (!isDate(value, "YYYY-MM-DD")) return Promise.reject(`Date is invalid`);
          return Promise.resolve();
        },
      };
    }

    if (dataType === "numeric") {
      fieldValidation["isInt"] = true;
      fieldValidation["toInt"] = true;
    }

    if (dataType === "boolean") {
      fieldValidation["isBoolean"] = true;
      fieldValidation["toBoolean"] = true;
    }

    schema[`${field?.id}.value`] = fieldValidation;
  });

  return schema;
};
