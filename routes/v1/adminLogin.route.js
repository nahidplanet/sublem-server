const express = require('express');
const { adminLogin } = require('../../controller/adminLogin.controller');
const { checkAdmin } = require('../../middleware/checkAdmin');
const { checkRole } = require('../../middleware/checkRole');
const { verifyToken } = require('../../middleware/verifyToken');

const adminRoute = express.Router()


adminRoute.route("/")
	.get()
	.post(checkAdmin("admin"), adminLogin)
	.patch()
	.delete()

module.exports = adminRoute;