const { isDate } = require("../../modules/validator");
const moment = require("moment");
const config = require("../user.config");
const LocationService = require("../../location/location.service");

const locationService = new LocationService();

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

  "location.city": {
    custom: {
      options: async (value, { req }) => {
        if (req?.body?.accountType === "business") return Promise.resolve();

        if (!value) return Promise.reject("City is required");

        if (!(await locationService.cityExists(value))) return Promise.reject("Invalid City");

        return Promise.resolve();
      },
    },
  },

  "location.region": {
    custom: {
      options: async (value, { req }) => {
        if (req?.body?.accountType === "business") return Promise.resolve();

        if (!value) return Promise.reject("Region is required");

        if (!(await locationService.regionExists(value))) return Promise.reject("Invalid Region");

        return Promise.resolve();
      },
    },
  },

  "location.country": {
    custom: {
      options: async (value, { req }) => {
        if (req?.body?.accountType === "business") return Promise.resolve();

        if (!value) return Promise.reject("Country is required");

        if (!(await locationService.countryExists(value))) return Promise.reject("Invalid Country");

        return Promise.resolve();
      },
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

  tinNumber: {
    notEmpty: {
      errorMessage: "TIN number is required",
    },
  },
};
