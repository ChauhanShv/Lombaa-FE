const CategoryService = require("../category/category.service");

const fieldsValidator = async (value, { req, location, path }) => {
  if (!Array.isArray(value)) {
    return Promise.resolve();
  }

  const categoryService = new CategoryService();
  const category = await categoryService.getById(req.body.categoryId);

  console.log({ category });

  return Promise.reject('Testing');
}

module.exports = {
  "title": {
    notEmpty: {
      errorMessage: "Field 'Title' cannot be empty",
    },
  },

  "description": {
    optional: { options: { nullable: true } },
  },

  "isNegotiable": {
    notEmpty: {
      errorMessage: "Field 'Negotiable' cannot be empty",
    },
    isBoolean: true,
    toBoolean: true
  },

  "isFree": {
    notEmpty: { errorMessage: "Field 'Free' cannot be empty" },
    isBoolean: true,
    toBoolean: true
  },

  "buyerDoDelivery": {
    optional: { options: { nullable: true } },
    isBoolean: true,
    toBoolean: true,
  },

  "condition": {
    optional: { options: { nullable: true } },
    isIn: {
      options: [["yes", "no"]],
      errorMessage: "Field 'Condition' has invalid value"
    }
  },

  "location": {
    notEmpty: { errorMessage: "Location cannnot be empty" }
  },

  "promoteType": {
    optional: { options: { nullable: true } },
    isIn: {
      options: [["yes", "no"]],
      errorMessage: "Field 'Promote Type' has invalid value"
    }
  },

  "dealMethod": {
    optional: { options: { nullable: true } },
    isIn: {
      options: [["yes", "no"]],
      errorMessage: "Field 'Deal Method' has invalid value"
    }
  },

  "fields": {
    isArray: true,
    custom: {
      options: fieldsValidator
    }
  }
};
