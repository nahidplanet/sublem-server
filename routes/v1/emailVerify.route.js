
const express = require('express');
const { verifyEmail } = require('../../controller/verifyEmail.controller');
const emailVerify = express.Router()

emailVerify.route("/:token")
.get(verifyEmail)
module.exports = emailVerify;
