const BaseController = require("../modules/controller").base;
const Chat = require("./chat.model")
const Product = require("../product/product.model")
const validationErrorFormatter = require("../modules/formatter").validationErrorFormatter;
const { validationResult } = require("express-validator");
const ChatMessage = require("./chat.message.model");
const responseFormatter = require("../modules/formatter").response;


class ChatController extends BaseController {
    constructor() {
        super()
    }

    chatInstance = async (req, res, next) => {
        try {
            validationResult(req).formatWith(validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }
        try {
            const { productId } = req?.body

            const userId = req.user?.id
            let alreadyExists = await Chat.findOne({ where: { buyerId: userId, productId: productId } })
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
}
module.exports = ChatController