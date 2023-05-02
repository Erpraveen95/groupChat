const express = require('express')
const router = express.Router()

const userAuthorization = require("../middleware/authenticate")
const chatControllers = require("../controllers/chatControllers")

router.post("/sendmessage", userAuthorization.authenticate, chatControllers.postChat)

module.exports = router