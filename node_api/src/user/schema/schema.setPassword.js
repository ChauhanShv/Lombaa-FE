const UserService = require('../user.service');
const userService = new UserService();

module.exports = {
    oldPassword: {
        custom: {
            options: async (value, { req, location, path }) => {
                const userHasPassword = await userService.hasPassword(req?.user?.id);

                if (!userHasPassword)
                    return Promise.resolve();

                if (!value)
                    return Promise.reject("Old password is required");

                if (!await userService.verifyPassword(req.user?.id, value))
                    return Promise.reject("Old password is incorrect");
            }
        },
    },

    password: {
        notEmpty: {
            errorMessage: "New password is required",
        }
    }
}