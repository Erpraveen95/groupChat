const Messages = require("../models/message")
const User = require("../models/user")
const { Op } = require("sequelize")

exports.postChat = async (req, res) => {
    try {
        const user = req.user
        const { message } = req.body
        if (message === "") {
            return res.status(401).json({ message: "invalid message", success: "false" })
        }
        const newMessage = await user.createMessage({ message: message })
        res.status(200).json({ success: "true", name: user.name, message: newMessage.message })
    } catch (error) {
        res.status(500).json({ success: "false", error })
    }
}

exports.getAllChat = async (req, res) => {
    try {
        const user = req.user
        const chat = await Messages.findAll({ where: { userId: user.id } })
        console.log(chat[chat.length - 1].id, "this is last message id")
        res.status(200).json({ message: "fetch success", chat, lastChatId: chat[chat.length - 1].id })
    } catch (error) {
        res.status(500).json({ success: "false", message: "chat fetch error" })
    }
}

exports.fetchChat = async (req, res) => {
    try {
        const user = req.user
        const lastChatId = +req.params.lastId
        console.log("this is last chat i backend", lastChatId)
        const chat = await Messages.findAll({ where: { userId: user.id, id: { [Op.gt]: lastChatId } } })
        console.log(chat, "this is chat")
        if (chat == [] || chat === null || chat.length == 0) {
            return res.status(201).json({ message: "chat up to date" })
        }
        res.status(200).json({ message: "fetch success", chat, lastChatId: chat[chat.length - 1].id })
    } catch (error) {
        res.status(500).json({ success: "false", message: "chat fetch error" })
    }
}
