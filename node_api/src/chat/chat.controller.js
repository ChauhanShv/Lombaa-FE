const BaseController = require("../modules/controller").base;
const Chat = require("./chat.model")
const Product = require("../product/product.model")
const validationErrorFormatter = require("../modules/formatter").validationErrorFormatter;
const { validationResult } = require("express-validator");
const ChatMessage = require("./chat.message.model");
const responseFormatter = require("../modules/formatter").response;
const moment = require("moment");
const SettingService = require("../settings/settings.service");


class ChatController extends BaseController {
    constructor() {
        super();
        this.settingService = new SettingService()
    }

    initChat = async (req, res, next) => {
        try {
            validationResult(req).formatWith(validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }
        try {
            const { productId } = req?.body
            const userId = req.user?.id

            let alreadyExists = await Chat.findOne({ where: { buyerId: userId, productId: productId } });
            if (alreadyExists) {
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat already exits", data: alreadyExists } })
            }

            if (!alreadyExists) {
                const product = await Product.findOne({ where: { id: productId } })
                const chatData = await Chat.create({ productId: productId, buyerId: userId, sellerId: product.userId })
            }
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to chat", message_details: error?.message } })
        }
    }

    sendMessage = async (req, res, next) => {
        try {
            const { text, chatId } = req?.body
            const userId = req.user?.id

            const message = await ChatMessage.create({ postedById: userId, text: text, chatId: chatId, })

            return super.jsonRes({ res, code: 200, data: { success: true, message: "Message sent successfully", data: message } })
        }
        catch (error) {
            console.log(error)
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to send message", message_details: error?.message } })
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req?.body;
            const userId = req.user?.id

            const data = await Chat.findOne({ where: { id: id } })
            if (userId === data.buyerId) {
                const buyerDeletedAt = await Chat.update({ buyerDeletedAt: moment() }, { where: { id: id } })

                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat deleted" } })
            }
            if (userId === data.sellerId) {
                const sellerDeletedAt = await Chat.update({ sellerDeletedAt: moment() }, { where: { id: id } })

                return super.jsonRes({ res, code: 200, data: { success: false, message: "Chat deleted" } })
            }
        }
        catch (error) {
            console.log(error)
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to delete chat", message_details: error?.message } })

        }

    }
    getMessages = async (req, res, next) => {
        try {
            try {
                validationResult(req).formatWith(validationErrorFormatter).throw();
            } catch (error) {
                return res.status(422).json(error.array({ onlyFirstError: true }));
            }
            const userId = req.user?.id
            const { chatId } = req?.body
            const data = await Chat.findOne({ where: { id: chatId } })
            if (userId === data.buyerId || userId === data.sellerId) {
                const { limit, offset } = req.query
                const messages = await ChatMessage.findAll({ where: { chatId: chatId }, offset: offset, limit: limit, order: [['createdAt', 'DESC']] })
                return super.jsonRes({ res, code: 200, data: { success: false, message: "Chat retreived", data: messages } })
            }
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Invalid Participant" } })

        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to retreived Chat", message_details: error?.message } })
        }
    }
}
module.exports = ChatController