const express = require('express');
const { addToCart, deleteToCart } = require('../../controller/cart.controller');
const { checkEmailVerify } = require('../../middleware/checkEmailVerify');
const { verifyToken } = require('../../middleware/verifyToken');

const cartRoute = express.Router()


cartRoute.route("/")
	.get()
	.patch()
	.delete()
cartRoute.route("/:type")
	.post(verifyToken, checkEmailVerify, addToCart)
cartRoute.route("/delete/:productId")
	.delete(verifyToken, checkEmailVerify, deleteToCart)





module.exports = cartRoute; 