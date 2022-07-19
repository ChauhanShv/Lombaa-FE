const Product = require("../product/product.model");
const Chat = require("./chat.model");
const ChatService = require("./chat.service")
const chatService = new ChatService()

module.exports = {
    id: {
        notEmpty: {
            errorMessage: "Chat id required"
        },
        in: ['params'],
        custom: {
            options: async (id, { req, location, path }) => {
                if (id && ! await chatService.chatIdexists(id)) return Promise.reject(`Chat does not exists`);
                return Promise.resolve();
            },
        }
    },
    limit: {
        optional: {
            options: { nullable: true },
        },
        in: ['query'],
        isInt: true,
        customSanitizer: {
            options: (value, { req, location, path }) => {
                if (isNaN(value)) return 0;
                if (value < 0) return 0;
                if (value > 50) return 50;
                value = parseInt(value)
                return value;
            },
        }
    },

    offset: {
        optional: {
            options: { nullable: true }
        },
        in: ['query'],
        isInt: true,
        customSanitizer: {
            options: (value, { req, location, path }) => {
                if (isNaN(value)) return 0;
                if (value < 0) return 0;
                if (value > 50) return 50;
                value = parseInt(value)
                return value
            }
        }
    }
}