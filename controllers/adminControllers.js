const User = require("../models/user")
const Group = require("../models/group")

exports.addMember = async (req, res) => {
    try {
        const email = req.body.email
        const groupId = req.body.groupId
        console.log(groupId, typeof groupId, email)
        const user = await User.findOne({ where: { email: email } })
        console.log(user.id, "addmember user")
        if (!user) {
            return res.status(404).json({ message: "email not registered", success: "false" })
        }
        const group = await Group.findOne({ where: { id: groupId } })
        console.log(group)

        const membercreate = await group.addUser(user, { through: { isAdmin: false } })
        console.log(membercreate)
        res.status(200).json({ message: "added new user to group ", success: "true" })

    } catch (error) {
        res.status(500).json({ message: "Ahh Snap !! Something went wrong. " })
    }
}