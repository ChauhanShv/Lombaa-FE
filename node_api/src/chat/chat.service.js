const Chat = require("./chat.model")
const Product = require("../product/product.model")
const ChatMessage = require("./chat.message.model")
const ProductMedia = require("../product/product_media.model")
const fileModel = require("../file/file.model");
const User = require("../user/user.model")
const ProductField = require("../product/product_field.model");
const Field = require("../field/field.model");
const ProductService = require("../product/product.service")


class ChatService {
    constructor() {
        this.productService = new ProductService()
    }

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
        return await Chat.findOne({ where: { buyerId: userId, productId: productId } });
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
        let data = await Chat.findAll({

            where: { sellerId: userId }, offset: offset, limit: limit, include: [
                { model: Product, as: 'product', include: [{ model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] }, { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] }] },
                { model: User, as: 'buyer', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
                { model: User, as: 'seller', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
                { model: ChatMessage }
            ]
        })
        data = data.map(data => {
            this.productService.fieldsMapping([data.product]);
            const p = { id: data?.product?.id, media: data?.product?.productMedia, fields: { title: data?.product?.title, price: data?.product?.price, description: data?.product?.description } }
            const result = { id: data?.id, buyer: data?.buyer, product: p }
            return result
        })
        return data
    }
    async sellerMessage(userId, offset, limit) {
        let data = await Chat.findAll({
            where: { buyerId: userId }, offset: offset, limit: limit, include: [
                { model: Product, as: 'product', include: [{ model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] }, { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] }] },
                { model: User, as: 'buyer', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
                { model: User, as: 'seller', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
                { model: ChatMessage }
            ]
        })
        data = data.map(data => {
            this.productService.fieldsMapping([data.product]);
            const p = { id: data?.product?.id, media: data?.product?.productMedia, fields: { title: data?.product?.title, price: data?.product?.price, description: data?.product?.description } }
            const result = { id: data?.id, seller: data?.seller, product: p }
            return result
        })
        return data
    }
}
module.exports = ChatService