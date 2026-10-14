const express = require("express")
const route = express.Router()
const userAutController = require("../controllers/userAuth")
const { verifyUser } = require("../middleware/authenticateUser")

route.post("/signup", userAutController.userRegistration)
route.post("/signin", userAutController.userLogin)
route.post("/reset-password", userAutController.resetPassowrd)
route.post("/verify-account", userAutController.accountVerification)

route.put("/update-profile", verifyUser, userAutController.updateSelfProfile)

module.exports = route