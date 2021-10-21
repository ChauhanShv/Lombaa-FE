const UserService = require('../user.service');
const userService = new UserService();

module.exports = {
    oldPassword: {
        custom: {
            options: async (value, { req, location, path }) => {
                const isUserPasswordSet = await userService.isPasswordSet(req?.user?.id);

                if (isUserPasswordSet && !value)
                    return Promise.reject("Old password is required");
                return Promise.resolve();
            }
        },
    },

    password: {
        notEmpty: {
            errorMessage: "New password is required",
        }
    }
}