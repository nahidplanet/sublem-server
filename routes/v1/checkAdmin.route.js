const express = require('express');
const { checkAdmin } = require('../../controller/checkAdmin.controller');
const { verifyToken } = require('../../middleware/verifyToken');

const AdminCheckRoute = express.Router()


AdminCheckRoute.route('/')
	.get(verifyToken, checkAdmin);







module.exports = AdminCheckRoute;