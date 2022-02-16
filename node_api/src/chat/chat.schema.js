const Product = require("../product/product.model");
const Chat = require("./chat.model");
const ChatService = require("./chat.service")
const chatService = new ChatService()

module.exports = {
    productId: {
        notEmpty: {
            errorMessage: "product id required"
        },
        custom: {
            options: async (id, { req, location, path }) => {
                if (id && ! await chatService.exists(id)) return Promise.reject(`Product does not exists`);

                console.log(await chatService.exists(id), 'hfhdsgyhsgafuyarghfwgfvcyuafyvwjhegvbhjfv')
                return Promise.resolve();
            },

        }
    }
}

