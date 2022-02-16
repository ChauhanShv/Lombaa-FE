const Chat = require("./chat.model")

class ChatService {

    async exists(id) {
        if (!id) return false;
        return !! await Chat.count({ where: { id: id } });
    }
}
module.exports = ChatService