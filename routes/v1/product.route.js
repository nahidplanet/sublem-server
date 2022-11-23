const express = require('express');
const {
	createProduct,
	getProducts,
	getProductById
} = require('../../controller/product.controller');
const upload = require('../../middleware/product.multer');


const productRoute = express.Router()


productRoute.route("/")
	.get(getProducts)
	.post(upload.array("productImage"), createProduct)
	.patch()
	.delete()
productRoute.route("/:id")
	.get(getProductById)
	.post()
	.patch()
	.delete()


module.exports = productRoute;