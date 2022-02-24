
const NotificationService = require("./notification.service")
const notificationService = new NotificationService()

module.exports = {
    id: {
        notEmpty: {
            errorMessage: "notification id required"
        },
        in: ['body'],
        custom: {
            options: async (id, { req, location, path }) => {
                if (id && ! await notificationService.exists(id)) return Promise.reject(`notification does not exists`);
                return Promise.resolve();
            },
        }
    }
}

