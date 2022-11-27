const express = require('express');
const { allUser } = require('../../controller/user.controller');


const userRoute = express.Router()


userRoute.route("/")
	.get(allUser)
	.post()
	.patch()
	.delete()
userRoute.route("/:id")
	.get()
	.post()
	.patch()
	.delete()


module.exports = userRoute;