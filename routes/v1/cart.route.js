const express = require('express');
const { addToCart, deleteToCart, deleteFullCart } = require('../../controller/cart.controller');
const { checkEmailVerify } = require('../../middleware/checkEmailVerify');
const { verifyToken } = require('../../middleware/verifyToken');

const cartRoute = express.Router()


cartRoute.route("/:type")
	.post(verifyToken, checkEmailVerify, addToCart)

cartRoute.route("/delete/:productId")
	.delete(verifyToken, checkEmailVerify, deleteToCart);



cartRoute.route("/deleteFull")
	.delete(verifyToken, checkEmailVerify, deleteFullCart);




module.exports = cartRoute; 

