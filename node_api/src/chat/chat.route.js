const router = require("../modules/express").instance.Router();
const chatController = require("./chat.controller");
const authMiddleware = require("../auth/auth.middleware");
const chatSchema = require("./chat.schema")
const getChatSchema = require("./chat.getMessages.schema")
const chatIdSchema = require("./chatID.schema")
const mediaSchema = require("./media.schema")
const optionalAuthMiddleware = require("../auth/optional.auth.middleware")
const { checkSchema } = require("express-validator");

const multer = require("multer");
const storage = multer.memoryStorage();


const controller = new chatController();

module.exports = () => {
    router.post('/init', authMiddleware, checkSchema(chatSchema), controller.initChat);
    router.post("/sendMessage", authMiddleware, controller.sendMessage)
    router.post("/media", multer({ storage: storage }).any(), authMiddleware, checkSchema(mediaSchema), controller.uploadFile)
    router.delete("/delete", authMiddleware, controller.delete)
    router.get("/:id/messages", authMiddleware, checkSchema(chatIdSchema), controller.getMessages)
    router.get("/buyer", authMiddleware, checkSchema(getChatSchema), controller.buyerChat)
    router.get("/seller", authMiddleware, checkSchema(getChatSchema), controller.sellerChat)
    router.post("/report", optionalAuthMiddleware, controller.reportAbuse)
    return router;
};
