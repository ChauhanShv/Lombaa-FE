const Notification = require("./notification.model")
const BaseController = require("../modules/controller").base;
const moment = require("moment")
const { Op } = require("sequelize");
const validationErrorFormatter = require("../modules/formatter").validationErrorFormatter;
const { validationResult } = require("express-validator");


class NotificationController extends BaseController {

    getNotification = async (req, res, next) => {

        try {
            const id = req.user?.id
            const { offset, limit } = req.query
            const data = await Notification.findAndCountAll({
                where: { userId: id, type: { [Op.not]: 'chat' } }, offset: offset, limit: limit, order: [
                    ['seenAt', 'ASC']
                ],
            })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Notifications retreived", data: data } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to get notification", message_details: error?.message } })
        }

    }
    markAsRead = async (req, res, next) => {
        try {
            validationResult(req).formatWith(validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }
        try {
            const { id } = req.body
            const data = await Notification.update({ seenAt: moment() }, { where: { id: { [Op.in]: [id] } } })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Seen" } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, data: { success: false, message: "Failed to see message", message_details: error?.message } })
        }
    }
    delete = async (req, res, next) => {
        try {
            validationResult(req).formatWith(validationErrorFormatter).throw();
        } catch (error) {
            return res.status(422).json(error.array({ onlyFirstError: true }));
        }
        try {
            const { id } = req.body
            const data = await Notification.destroy({ where: { id: { [Op.in]: [id] } } })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "Successfully deleted" } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, success: false, message: "Failed to delete notification", message_details: error?.message })
        }
    }
    chatCount = async (req, res, next) => {
        try {
            const userId = req.user?.id
            const data = await Notification.count({ where: { userId: userId, type: 'chat' } })
            return super.jsonRes({ res, code: 200, data: { success: true, message: "retreived count", data: { count: data } } })
        }
        catch (error) {
            return super.jsonRes({ res, code: 400, success: false, message: "can't get count", message_details: error?.message })
        }
    }
}
module.exports = NotificationController