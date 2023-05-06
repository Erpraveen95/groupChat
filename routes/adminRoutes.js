const express = require("express")
const router = express.Router()

const userAuthorization = require("../middleware/authenticate")
const adminControllers = require("../controllers/adminControllers")

router.post("/admin/addMember", userAuthorization.authenticate, adminControllers.addMember)

module.exports = router