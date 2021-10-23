const User = require("../user.model");
const isMobile = require("../../modules/validator").isMobile;
module.exports = {
  phone: {
    notEmpty: {
      errorMessage: "Phone number is required",
    },

    custom: {
      options: async (value) => {
        if (!isMobile(value)) return Promise.reject("Invalid phone number");

        let user = await User.findOne({ where: { phoneNumber: value } });

        if (user) return Promise.reject("Phone number is not available");
        return Promise.resolve();
      },
    },
  },
};
