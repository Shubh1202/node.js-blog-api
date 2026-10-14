const express = require("express")
const routers = express.Router();
const userRoutes = require("./users")
const authRoutes = require("./userAuth")

routers.use("/auth", authRoutes)
routers.use("/user", userRoutes)

// console.log(routers)
module.exports = routers



