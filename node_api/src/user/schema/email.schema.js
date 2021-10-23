const User = require("../user.model");
module.exports = {
  email: {
    notEmpty: {
      errorMessage: "Email address is required",
    },
    isEmail: {
      errorMessage: "Invalid email address",
    },
    custom: {
      options: async (value, { req, location, path }) => {
        let user = await User.findOne({ where: { email: value } });

        if (user) return Promise.reject("Email address is not available");
        return Promise.resolve();
      }
    }
  }
};
