const { isDate } = require("../../modules/validator");
const moment = require("moment");
const config = require("../user.config");

module.exports = {
  name: {
    custom: {
      options: (value, { req, location, path }) => {
        if (req?.body?.accountType === "standard" && (value ?? "") === "") return Promise.reject("Name is required");
        return Promise.resolve();
      },
    },
  },

  businessName: {
    custom: {
      options: (value, { req }) => {
        if (req?.body?.accountType === "standard") return Promise.resolve();

        if ((value ?? "") === "") return Promise.reject("Business name is required");

        return Promise.resolve();
      },
    },
  },

  location: {
    optional: {
      options: { nullable: true },
    },
  },

  birthday: {
    optional: {
      options: { nullable: true },
    },
    custom: {
      options: async (value, { req, location, path }) => {
        if (!isDate(value, config?.dobFormat)) return Promise.reject("Date of birth is invalid");
        if (moment().diff(moment(value, config?.dobFormat), "years", false) < config.minAgeLimit) return Promise.reject(`Minimum required age is ${config.minAgeLimit} years`);
        return Promise.resolve();
      },
    },
    customSanitizer: {
      options: (value, { req, location, path }) => {
        if (!isDate(value, config?.dobFormat)) return null;
        return moment(value, config?.dobFormat);
      },
    },
  },

  sex: {
    optional: {
      options: { nullable: true },
    },

    custom: {
      options: (value, { req }) => {
        if (req?.body?.accountType === "business") return Promise.resolve();

        if (!config.genderOptions.includes(value)) return Promise.reject(`Invalid sex specified, allowed options are ${config.genderOptions?.join(", ")}`);

        return Promise.resolve();
      },
    },
  },

  bio: {
    custom: {
      options: (value, { req }) => {
        if (req?.body?.accountType === "standard" && (value ?? "") === "") return Promise.reject("Bio is required");
        return Promise.resolve();
      },
    },
  },

  businessName: {
    custom: {
      options: (value, { req }) => {
        if (req?.body?.accountType === "business" && (value ?? "") === "") return Promise.reject("Business name is required");
        return Promise.resolve();
      },
    },
  },

  aboutBusiness: {
    custom: {
      options: (value, { req }) => {
        if (req?.body?.accountType === "business" && (value ?? "") === "") return Promise.reject("About business is required");
        return Promise.resolve();
      },
    },
  },

  yearOfEstablishment: {
    optional: {
      options: { nullable: true },
    },

    custom: {
      options: async (value, { req, location, path }) => {
        if (req?.body?.accountType === "standard") return Promise.resolve();

        if (!isDate(value, config?.yearFormat)) return Promise.reject("Invalid year");

        return Promise.resolve();
      },
    },

    customSanitizer: {
      options: (value, { req, location, path }) => {
        if (!isDate(value, config?.yearFormat)) return null;
        return moment(value, config?.yearFormat);
      },
    },
  },

  accountType: {
    notEmpty: {
      errorMessage: "Account type is required",
    },

    isIn: {
      options: [["standard", "business"]],
      errorMessage: "Account type should be 'Standard' or 'Business'",
    },
  },
};
