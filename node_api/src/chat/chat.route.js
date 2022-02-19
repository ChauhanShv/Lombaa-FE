const router = require("../modules/express").instance.Router();
const chatController = require("./chat.controller");
const authMiddleware = require("../auth/auth.middleware");
const chatSchema = require("./chat.schema")
const getChatSchema = require("./chat.getMessages.schema")
const { checkSchema } = require("express-validator");


const controller = new chatController();

module.exports = () => {
    router.post('/init', authMiddleware, checkSchema(chatSchema), controller.chatInstance);
    router.post("/sendMessage", authMiddleware, controller.sendMessage)
    router.delete("/delete", authMiddleware, controller.delete)
    router.get("/messages", authMiddleware, checkSchema(getChatSchema), controller.getMessages)
    return router;
};
