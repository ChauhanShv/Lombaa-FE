const Chat = require("./chat.model")
const Product = require("../product/product.model")
const ChatMessage = require("./chat.message.model")

class ChatService {

    async exists(id) {
        if (!id) return false;
        return !! await Product.count({ where: { id: id } });
    }
    async chatIdexists(id) {
        if (!id) return false
        return !! await Chat.count({ where: { id: id } })
    }
    async alreadyExists(userId, productId) {
        if (!productId) return false
        return !! await Chat.findOne({ where: { buyerId: userId, productId: productId } });
    }
    async createChat(userId, productId) {
        const product = await Product.findOne({ where: { id: productId } })
        const chatData = await Chat.create({ productId: productId, buyerId: userId, sellerId: product.userId })
        return chatData
    }
    async sendMessage(userId, text, chatId) {
        return await ChatMessage.create({ postedById: userId, text: text, chatId: chatId, })
    }
    async findChat(id) {
        return await Chat.findOne({ where: { id: id } })
    }
    async buyerDelete(id) {
        return await Chat.update({ buyerDeletedAt: moment() }, { where: { id: id } })
    }
    async sellerDelete(id) {
        return await Chat.update({ sellerDeletedAt: moment() }, { where: { id: id } })
    }
    async findMessage(chatId, offset, limit) {
        const message = await ChatMessage.findAll({ where: { chatId: chatId }, offset: offset, limit: limit, order: [['createdAt', 'DESC']] })
        return message
    }
    async buyerMessage(userId, offset, limit) {
        return await Chat.findAll({ where: { buyerId: userId }, offset: offset, limit: limit })
    }
    async sellerMessage(userId, offset, limit) {
        return await Chat.findAll({ where: { sellerId: userId }, offset: offset, limit: limit })
    }
}
module.exports = ChatService