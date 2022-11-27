const express = require('express');
const { userLogin } = require('../../controller/userLogin.controller');

const loginRoute = express.Router();

loginRoute.route("/")
	.post(userLogin)
module.exports = loginRoute;