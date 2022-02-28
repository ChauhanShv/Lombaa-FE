const Chat = require('../chat/chat.model');
const Notification = require('./notification.model')
const User = require("../user/user.model")
const ChatMessage = require("../chat/chat.message.model")
const moment = require('moment')

class NotificationService {
    constructor() {
    }

    async exists(id) {
        if (!id) return false;
        return !! await Notification.count({ where: { id: id } });
    }

    async sendNotification(data) {
        const chat = await Chat.findOne({
            where: { id: data.ChatId }, include: [
                { model: User, as: 'seller', attributes: ["name", "lastActiveAt"] },
                { model: User, as: 'buyer', attributes: ["name"] },
            ]
        })
        const lastActive = chat.seller.lastActiveAt
        const Date = moment(lastActive)
        const current = moment()
        const diffDate = current.diff(Date, 'minutes')
        const userId = chat.sellerId
        if (diffDate <= 10)
            return data;

        const name = `New message from ${chat.buyer.name}`
        const description = data.text
        const path = `chat/${data.ChatId}`
        const type = "chat"
        const notification = Notification.create({ text: name, description: description, path: path, type: type, userId: userId })
        return data
    }
}
module.exports = NotificationService