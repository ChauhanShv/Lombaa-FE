const Chat = require("./chat.model")
const Product = require("../product/product.model")
const ChatMessage = require("./chat.message.model")
const ProductMedia = require("../product/product_media.model")
const fileModel = require("../file/file.model");
const User = require("../user/user.model")
const ProductField = require("../product/product_field.model");
const Field = require("../field/field.model");
const ProductService = require("../product/product.service");
const moment = require('moment')
const FileService = require("../file/file.service");


class ChatService {
    constructor() {
        this.productService = new ProductService()
        this.fileService = new FileService();
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
        return await Chat.findOne({ where: { buyerId: userId, productId: productId }, attributes: ["id"] });
    }
    async createChat(userId, productId) {
        const product = await Product.findOne({ where: { id: productId } })
        let chatData = await Chat.create({ productId: productId, buyerId: userId, sellerId: product.userId })
        chatData = {
            id: chatData.id
        }
        return chatData
    }
    async sendMessage(userId, text, chatId, media) {
        const data = await ChatMessage.create({
            postedById: userId, text: text, ChatId: chatId, mediaId: media
        })
        const message = await this.findMessageById(data?.id)
        return { id: message?.id, text: message?.text, createdAt: message?.createdAt, postedBy: message?.postedBy }
    }
    async findChat(id) {
        const data = await Chat.findOne({
            where: { id: id }, include: [
                { model: User, as: 'buyer', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
                { model: User, as: 'seller', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
                { model: Product, as: 'product', include: [{ model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] }] }
            ]
        })
        return data
    }
    async buyerDelete(id) {
        return await Chat.update({ buyerDeletedAt: moment() }, { where: { id: id } })
    }
    async sellerDelete(id) {
        return await Chat.update({ sellerDeletedAt: moment() }, { where: { id: id } })
    }
    async findMessage(chatId, offset, limit) {
        let message = await ChatMessage.findAll({
            where: { ChatId: chatId }, offset: offset, limit: limit, order: [['createdAt', 'DESC']], include: [
                { model: User, as: 'postedBy', attributes: ["id", "name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] },
                // { model: Chat, include: [{ model: User, as: 'seller', attributes: ["name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] }] }
            ]
        })
        const messages = message.map(data => {
            message = { id: data.id, text: data.text, createdAt: data.createdAt, postedBy: data.postedBy }
            return message;

        })
        return messages;
    }
    async buyerMessage(userId, offset, limit) {
        let data = await this.common('sellerId', userId, offset, limit)
        return data
    }
    async sellerMessage(userId, offset, limit) {
        let data = await this.common('buyerId', userId, offset, limit)
        return data
    }
    async common(key, userId, offset, limit) {
        const where = { [key]: userId }
        const toInclude = key === 'sellerId' ?
            [{ model: User, as: 'buyer', attributes: ["id", "name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] }]
            :
            [{ model: User, as: 'seller', attributes: ["id", "name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] }];

        let data = await Chat.findAll({
            where, offset: offset, limit: limit, include: [
                { model: Product, as: 'product', include: [{ model: ProductMedia, as: "productMedia", include: [{ model: fileModel, as: 'file' }] }, { model: ProductField, as: "productFields", include: [{ model: Field, as: 'field' }] }] },
                ...toInclude,
                { model: ChatMessage, attributes: ['id', 'text', 'createdAt'], limit: 1, order: [["createdAt", "DESC"]] }
            ]
        });

        data = data.map((data, index) => {
            this.productService.fieldsMapping([data.product]);
            const p = { id: data?.product?.id, media: data?.product?.productMedia, title: data?.product?.title, description: data?.product?.description }
            const result = { id: data?.id, to: data?.seller ?? data?.buyer, product: p, lastMessage: data?.ChatMessages?.[0] }
            return result;
        })
        return data
    }
    async findMessageById(id) {
        return await ChatMessage.findByPk(id, {
            include: [
                { model: User, as: 'postedBy', attributes: ["id", "name", "profilePictureId"], include: [{ model: fileModel, as: "profilePicture" }] }
            ]
        })
    }
    async uploadMedia(docs, s3Data) {
        if (!s3Data || !docs) return false;
        const location = "S3";
        const relativePath = "";
        const uploadedFile = await this.fileService.create(docs, s3Data, location, relativePath);
        if (!uploadedFile) {
            return null;
        }
        return uploadedFile

    }
}
module.exports = ChatService