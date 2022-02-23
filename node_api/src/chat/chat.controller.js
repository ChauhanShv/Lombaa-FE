const BaseController = require("../modules/controller").base;
const Chat = require("./chat.model")
const Product = require("../product/product.model")
const validationErrorFormatter = require("../modules/formatter").validationErrorFormatter;
const { validationResult } = require("express-validator");
const ChatMessage = require("./chat.message.model");
const responseFormatter = require("../modules/formatter").response;
const moment = require("moment");
const SettingService = require("../settings/settings.service");
const ChatService = require("./chat.service")
const NotificationService = require("../notification/notification.service")


class ChatController extends BaseController {
    constructor() {
        super();
        this.settingService = new SettingService()
        this.chatService = new ChatService()
        this.notificationService = new NotificationService()
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

            let alreadyExists = await this.chatService.alreadyExists(userId, productId)
            if (alreadyExists) {
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat already exits", data: alreadyExists } })
            }

            if (!alreadyExists) {
                const ChatStarted = await this.chatService.createChat(userId, productId)
                return super.jsonRes({ res, code: 200, data: { success: true, message: "New chart has been started" } })
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

            const message = await this.chatService.sendMessage(userId, text, chatId)
            const notification = this.notificationService.sendNotification(message)
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

            const data = this.chatService.findChat(id)
            if (userId === data.buyerId) {
                const buyerDeletedAt = await this.chatService.buyerDelete(id)
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat deleted" } })
            }
            if (userId === data.sellerId) {
                const sellerDeletedAt = await this.chatService.sellerDelete(id)
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
            const chatId = req?.params?.id
            const data = await this.chatService.findChat(chatId)
            if (userId === data.buyerId || userId === data.sellerId) {
                const { limit, offset } = req.query
                const messages = await this.chatService.findMessage(chatId, offset, limit)
                return super.jsonRes({ res, code: 200, data: { success: false, message: "Chat retreived", meta: { limit: limit, offset: offset }, data: messages } })
            }
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Invalid Participant" } })
        }
        catch (error) {
            console.log(error)
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to retreived Chat", message_details: error?.message } })
        }
    }
    buyerChat = async (req, res, next) => {
        try {
            const userId = req.user?.id
            const { offset, limit } = req.query
            const data = await this.chatService.buyerMessage(userId, offset, limit)
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat retreived", meta: { limit: limit, offset: offset }, data: data } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to retreived chat", message_details: error?.message } })
        }
    }
    sellerChat = async (req, res, next) => {
        try {
            const userId = req.user?.id
            const { offset, limit } = req.query
            const data = await this.chatService.sellerMessage(userId, offset, limit)
            return super.jsonRes({ res, code: 200, data: { success: true, message: 'Chat retreived', meta: { limit: limit, offset: offset }, data: data } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to retreived chat", message_details: error?.message } })
        }
    }

}
module.exports = ChatController