const express = require('express');
const { getArabicProducts } = require('../../controller/arabic.controller');

const arabicRoute = express.Router()


arabicRoute.route("/")
	.get(getArabicProducts)
	.post()
	.patch()
	.delete()
arabicRoute.route("/:id")
	.get()
	.post()
	.patch()
	.delete()


module.exports = arabicRoute;