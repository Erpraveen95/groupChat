const Messages = require("../models/message")
const User = require("../models/user")

exports.postChat = async (req, res) => {
    try {
        const user = req.user
        const { message } = req.body
        if (message === "") {
            return res.status(401).json({ message: "invalid message", success: "false" })
        }
        const newMessage = await user.createMessage({ message: message })
        console.log(newMessage.message)
        res.status(200).json({ success: "true", name: user.name, message: newMessage.message })
    } catch (error) {
        res.status(500).json({ success: "false", error })
    }
}