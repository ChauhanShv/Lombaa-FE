const Chat = require("./chat.model")
const Product = require("../product/product.model")

class ChatService {

    async exists(id) {
        if (!id) return false;
        return !! await Product.count({ where: { id: id } });
    }
}
module.exports = ChatService