module.exports = {
    email: {
        notEmpty: { errorMessage: "Email address is required" },
        isEmail: { errorMessage: "Invalid email address" }
    },
};
