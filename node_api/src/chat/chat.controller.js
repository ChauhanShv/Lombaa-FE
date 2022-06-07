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
const FileType = require('file-type')
const S3Service = require("../modules/s3/s3.service")
const { v4: uuidv4 } = require("uuid");
const ProductService = require("../product/product.service");
const ChatReportAbuse = require("../report_abuse/chat.report.abuse.model")



class ChatController extends BaseController {
    constructor() {
        super();
        this.settingService = new SettingService()
        this.service = new ChatService()
        this.notificationService = new NotificationService()
        this.s3Service = new S3Service()
        this.productService = new ProductService()
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

            let alreadyExists = await this.service.alreadyExists(userId, productId)
            if (alreadyExists) {
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat already exits", data: alreadyExists } })
            }

            if (!alreadyExists) {
                const chatStarted = await this.service.createChat(userId, productId)
                return super.jsonRes({ res, code: 200, data: { success: true, message: "New chart has been started", data: chatStarted } })
            }
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to chat", message_details: error?.message } })
        }
    }

    sendMessage = async (req, res, next) => {
        try {
            const { text, chatId, media } = req?.body
            const userId = req.user?.id
            const message = await this.service.sendMessage(userId, text, chatId, media)
            const notification = this.notificationService.sendNotification({ ...message, ChatId: chatId })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Message sent successfully", data: message } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to send message", message_details: error?.message } })
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req?.body;
            const userId = req.user?.id

            const data = this.service.findChat(id)
            if (userId === data.buyerId) {
                const buyerDeletedAt = await this.service.buyerDelete(id)
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat deleted" } })
            }
            const sellerDeletedAt = await this.service.sellerDelete(id)
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat deleted" } })
        }
        catch (error) {
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
            const { limit, offset } = req.query;

            const data = await this.service.findChat(chatId)
            let product = data.product
            product = this.productService.fieldsMapping([product])
            product = product.map(data => {
                let result = { id: data?.id, slug: data?.slug, productMedia: data?.productMedia, title: data?.title, description: data?.description }
                return result
            })
            if (userId !== data?.buyerId && userId !== data?.sellerId)
                return super.jsonRes({ res, code: 400, data: { success: false, message: "Invalid Participant" } });

            let receiver = data?.buyer;
            if (userId === data?.buyerId)
                receiver = data?.seller;

            const messages = await this.service.findMessage(chatId, offset, limit)
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat retreived", meta: { limit: limit, offset: offset }, data: { to: receiver, messages, product } } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to retreived Chat", message_details: error?.message } })
        }
    }
    buyerChat = async (req, res, next) => {
        try {
            const userId = req.user?.id
            const { offset, limit } = req.query
            const data = await this.service.buyerMessage(userId, offset, limit)
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
            const data = await this.service.sellerMessage(userId, offset, limit)
            return super.jsonRes({ res, code: 200, data: { success: true, message: 'Chat retreived', meta: { limit: limit, offset: offset }, data: data } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to retreived chat", message_details: error?.message } })
        }
    }
    uploadFile = async (req, res, next) => {
        try {
            const data = req.files;
            const file = await FileType.fromBuffer(data[0].buffer);
            const key = `${uuidv4()}.${file.ext}`;

            const body = data[0].buffer;
            const s3Data = await this.s3Service.upload({ key, body });
            if (!s3Data) {
                const data = {
                    success: false,
                    error: { code: 400, message: "Failed to send media", message_detail: "s3 is enable to allow you space" },
                };
                return super.jsonRes({ res, code: 400, data });
            }
            const dUser = await this.service.uploadMedia(data, s3Data);

            if (!dUser) {
                const data = { success: false, error: { code: 400, message: "Failed to send media", message_detail: "Unable to load user data" } };
                return super.jsonRes({ res, code: 400, data });
            }
            super.jsonRes({ res, code: 200, data: { success: true, message: "Media has been sent ", metadata: { file: dUser.id } } });
        } catch (error) {
            const data = {
                success: false,
                error: { code: 400, message: "Failed to send media", message_detail: "something went wrong" },
            };
            super.jsonRes({ res, code: 400 });
        }
    }
    reportAbuse = async (req, res, next) => {
        try {
            const userId = req.user?.id
            const data = req?.body
            if (!userId) {
                const insert = await ChatReportAbuse.create({ comment: data.comment, value: data.value, chatId: data.chatId })
                return super.jsonRes({ res, code: 200, data: { success: true, messaage: "Reported Succesfully", data: insert } })
            }
            const insert = await ChatReportAbuse.create({ comment: data.comment, value: data.value, userId: userId, chatId: data.chatId })
            return super.jsonRes({ res, code: 200, data: { success: true, messaage: "Reported Succesfully", data: insert } })

        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to Report", messaage_detail: error?.message } })
        }
    }
};
module.exports = ChatController