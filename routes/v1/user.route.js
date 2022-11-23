const express = require('express');
const { createUser } = require('../../controller/user.controller');
const { checkNewUser } = require('../../middleware/checkNewUser');
const userRoute=express.Router();


userRoute.route("/")
.get()
.post(checkNewUser,createUser)
userRoute.route("/:id")
.get()

module.exports = userRoute;