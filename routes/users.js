const express = require("express");
const routes = express.Router()
const userController = require("../controllers/users")
const { verifyUser } = require("../middleware/authenticateUser")

routes.get("/", verifyUser, userController.getUsers);
routes.get("/:id", verifyUser, userController.getUserById);
routes.post("/", verifyUser, userController.createUsers);
routes.put("/", verifyUser, userController.updateUserById);

// console.log(routes)
module.exports = routes