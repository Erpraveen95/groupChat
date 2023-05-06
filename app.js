const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())
const sequelize = require("./util/database")

const User = require("./models/user")
const Group = require("./models/group")
const Message = require('./models/message')
const GroupUser = require("./models/groupUser")

const signupRoutes = require("./routes/signup")
const chatRoutes = require("./routes/chatRoutes")
const groupRoutes = require("./routes/groupRoutes")
const adminRoutes = require("./routes/adminRoutes")

User.hasMany(Message)
Message.belongsTo(User)
Group.belongsToMany(User, { through: GroupUser })
User.belongsToMany(Group, { through: GroupUser })
Group.hasMany(Message)
Message.belongsTo(Group)

app.use(signupRoutes)
app.use("/chat", chatRoutes)
app.use("/groups", groupRoutes)
app.use(adminRoutes)

sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
        console.log("db connected")
        app.listen(3000, () => {
            console.log('server started at port 3000')
        })
    })
