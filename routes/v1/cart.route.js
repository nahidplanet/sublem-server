const express = require('express');
const { addToCart } = require('../../controller/cart.controller');
const { checkEmailVerify } = require('../../middleware/checkEmailVerify');
const { verifyToken } = require('../../middleware/verifyToken');

const cartRoute = express.Router()



cartRoute.route("/:id")
	.post(verifyToken, checkEmailVerify, addToCart)





module.exports = cartRoute; 