const express = require('express');
const { createUser } = require('../../controller/userRegistration.controller');
const { checkNewUser } = require('../../middleware/checkNewUser');
const singUpRoute = express.Router();


singUpRoute.route("/")
	.get()
	.post(checkNewUser, createUser)
singUpRoute.route("/:id")
	.get()

module.exports = singUpRoute;