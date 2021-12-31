module.exports = {
  consent: {
    notEmpty: {
      errorMessage: "Consent is required",
    },
    isBoolean: true,
    toBoolean: true,
  },
};
