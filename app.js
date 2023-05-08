const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
const sequelize = require("./util/database")

const User = require("./models/user")
const Group = require("./models/group")
const Message = require('./models/message')
const GroupUser = require("./models/groupUser")
const Forgetpassword = require("./models/forgetPasswords")

const signupRoutes = require("./routes/signup")
const chatRoutes = require("./routes/chatRoutes")
const groupRoutes = require("./routes/groupRoutes")
const adminRoutes = require("./routes/adminRoutes")
const forgotPasswordRoute = require("./routes/forgotPassword")


User.hasMany(Message)
Message.belongsTo(User)
Group.belongsToMany(User, { through: GroupUser })
User.belongsToMany(Group, { through: GroupUser })
Group.hasMany(Message)
Message.belongsTo(Group)
User.hasMany(Forgetpassword)
Forgetpassword.belongsTo(User)

app.use(signupRoutes)
app.use(forgotPasswordRoute)
app.use("/chat", chatRoutes)
app.use("/groups", groupRoutes)
app.use(adminRoutes)

app.use((req, res) => {
    console.log(req.url)
    res.sendFile(path.join(__dirname, `public/html/${req.url}`))
})

sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
        console.log("db connected")
        app.listen(process.env.PORT, () => {
            console.log(`server started at port ${process.env.PORT}`)
        })
    })
