const User = require("../user.model");
const isMobile = require("../../modules/validator").isMobile;
module.exports = {
  phoneNumber: {
    notEmpty: {
      errorMessage: "Email address is required",
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
};
