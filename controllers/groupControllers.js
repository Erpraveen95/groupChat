const Group = require("../models/group")
const User = require("../models/user")
exports.createGroup = async (req, res) => {
    try {
        const { name, description } = req.body
        const user = req.user
        if (name.length > 0 && typeof name === "string") {
            const group = await user.createGroup({ name, description },
                { through: { isAdmin: true } })
            res.status(200).json({ message: "create group success", group, success: "true" })
        }

    } catch (error) {
        res.status(500).json({ error, success: "false" })
    }
}

exports.getAllGroups = async (req, res) => {
    try {
        const user = req.user
        const groups = await user.getGroups();
        if (!groups || groups.length === 0) {
            return res.status(201).json({ message: "No Groups Present", success: "true" })
        }
        res.status(200).json({ message: "fetch success", groups, success: "true", username: user.name })
    } catch (error) {
        res.status(500).json({ error, success: "false" })
    }
}