const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const sequelize = require("./util/database")
const signupRoutes = require("./routes/signup")

app.use(signupRoutes)


sequelize
    .sync()
    //.sync({ force: true })
    .then(() => {
        console.log("db connected")
        app.listen(3000, () => {
            console.log('server started at port 3000')
        })
    })
