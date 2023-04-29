const User = require("../models/user")
const sequelize = require("sequelize")
const Op = sequelize.Op
const bcrypt = require("bcrypt")

function validate(inputString) {
    if (inputString == undefined || inputString.length === 0) {
        return false
    } else {
        return true
    }
}
exports.signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if (!validate(name) || !validate(email) || !validate(phone) || !validate(password)) {
            res.status(401).json({ message: "Bad Parameters", success: "false" })
        }
        const saltrounds = 10;
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { phone: phone }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist" })
        }
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            if (err) {
                res.status(400).json({ err: err })
            }
            await User.create({ name, email, phone, password: hash })
            res.status(200).json({ message: "User created", status: "success" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}