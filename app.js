const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const User = require("./models/user")
const Messages = require('./models/message')

const sequelize = require("./util/database")
const signupRoutes = require("./routes/signup")
const chatRoutes = require("./routes/chatRoutes")


app.use(signupRoutes)
app.use("/chat", chatRoutes)

User.hasMany(Messages)
Messages.belongsTo(User)

sequelize
    .sync()
    //.sync({ force: true })
    .then(() => {
        console.log("db connected")
        app.listen(3000, () => {
            console.log('server started at port 3000')
        })
    })
