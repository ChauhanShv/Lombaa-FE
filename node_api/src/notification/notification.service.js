const Chat = require('../chat/chat.model');
const Notification = require('./notification.model')
const User = require("../user/user.model")
const moment = require('moment')

class NotificationService {
    constructor() {
    }

    async exists(id) {
        if (!id) return false;
        return !! await Notification.count({ where: { id: id } });
    }

    async sendNotification(data) {
        const chat = await Chat.findOne({ where: { id: data.ChatId }, include: [{ model: User, as: 'seller', attributes: ["name", "lastActiveAt"] }] })
        console.log(chat.seller.lastActiveAt, 'jhsfehjvefuiv')
        const lastActive = chat.seller.lastActiveAt
        const current = moment()
        console.log(lastActive, current, 'fjwhjbwhj')
        return data
    }
}
module.exports = NotificationService