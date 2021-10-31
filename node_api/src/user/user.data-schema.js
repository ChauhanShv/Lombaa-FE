const User = require("./user.model");
const { isMobile, isPassword } = require("../modules/validator");

module.exports = {
  name: {
    custom: {
      options: (value, { req, location, path }) => {
        if (req?.body?.accountType === "standard" && (value ?? "") === "")
          return Promise.reject("Name is required");
        return Promise.resolve();
      },
    },
  },

  businessName: {
    custom: {
      options: (value, { req }) => {
        if (req?.body?.accountType === "business" && (value ?? "") === "")
          return Promise.reject("Business name is required");
        return Promise.resolve();
      },
    },
  },

  email: {
    notEmpty: {
      errorMessage: "Email address is required",
    },
    isEmail: {
      errorMessage: "Email address is invalid",
    },
    custom: {
      options: async (value, { req, location, path }) => {
        let user = await User.findOne({ where: { email: value } });
        if (user) return Promise.reject("Email address is not available");
        return Promise.resolve();
      },
    },
  },

  phoneNumber: {
    optional: {
      options: { checkFalsy: true },
    },

    custom: {
      options: async (value) => {
        if (!isMobile(value)) return Promise.reject("Phone number is invalid");

        let user = await User.findOne({ where: { phoneNumber: value } });
        if (user) return Promise.reject("Phone number is not available");
        return Promise.resolve();
      },
    },
  },

  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    // custom: {
    //     options: (value) => {
    //         if (!isPassword(value))
    //             return Promise.reject('Password should contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character');
    //         return Promise.resolve();
    //     }
    // },
  },

  tinNumber: {
    custom: {
      options: (value, { req }) => {
        if (req?.body?.accountType === "business" && (value ?? "") === "")
          return Promise.reject("Tin number is required");
        return Promise.resolve();
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
