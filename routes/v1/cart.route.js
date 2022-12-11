const express = require('express');
const { addToCart, deleteToCart, deleteFullCart, userGetCart } = require('../../controller/cart.controller');
const { checkEmailVerify } = require('../../middleware/checkEmailVerify');
const { verifyToken } = require('../../middleware/verifyToken');

const cartRoute = express.Router()


cartRoute.route("/user/")
// user get all carts 
	.get(verifyToken, checkEmailVerify, userGetCart)
	// user add a new cart
	.post(verifyToken, checkEmailVerify, addToCart)

cartRoute.route("/delete/:productId")
	.delete(verifyToken, checkEmailVerify, deleteToCart);



cartRoute.route("/deleteFull")
	.delete(verifyToken, checkEmailVerify, deleteFullCart);




module.exports = cartRoute;

