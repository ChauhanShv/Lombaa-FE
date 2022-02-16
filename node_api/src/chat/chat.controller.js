const BaseController = require("../modules/controller").base;
const Chat = require("./chat.model")
const validationErrorFormatter = require("../modules/formatter").validationErrorFormatter;
const { validationResult } = require("express-validator");
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
            let alreadyExists = await Chat.findOne({ where: { userId: userId, productId: productId } })
            if (alreadyExists) {
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat already exits", data: alreadyExists } })
            }
            if (!alreadyExists) {
                const chatData = await Chat.create({ productId: productId, userId: userId })
                return super.jsonRes({ res, code: 200, data: { success: true, message: "Chat started", data: chatData } })
            }
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to chat", message_details: error?.message } })

        }

    }
}
module.exports = ChatController