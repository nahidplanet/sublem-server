const express = require('express');
const { userLogin } = require('../../controller/userLogin.controller');
const { checkRole } = require('../../middleware/checkRole');
const { verifyToken } = require('../../middleware/verifyToken');
const loginRoute = express.Router();

loginRoute.route("/")
.get()
.post(verifyToken,userLogin)
module.exports = loginRoute;