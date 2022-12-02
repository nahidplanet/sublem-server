const express = require('express');
const { RequireAuth } = require('../../controller/checkUser.controller');
const { verifyToken } = require('../../middleware/verifyToken');

const RequireAuthRoute = express.Router()


RequireAuthRoute.route('/')
	.get(verifyToken, RequireAuth);







module.exports = RequireAuthRoute;