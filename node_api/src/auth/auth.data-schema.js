module.exports = {
    'email': {
        notEmpty: {
            errorMessage: "Email address is required",
        },
        isEmail: {
            errorMessage: "Email address is invalid",
        },
    },

    'password': {
        notEmpty: {
            errorMessage: "Password is required",
        }
    }
}