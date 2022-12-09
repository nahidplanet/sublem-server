const express = require('express');
const { checkRole } = require('../../middleware/checkRole');
const upload = require('../../middleware/product.multer');
const { verifyToken } = require('../../middleware/verifyToken');
const {
	createProduct,
	getProducts,
	getProductById,
	updateProductById,
	deleteProductById
} = require('../../controller/product.controller');

const productRoute = express.Router()


productRoute.route("/")
	// get all product 
	.get(getProducts)
	// create a product 
	.post(verifyToken, checkRole("admin", "editor"), upload.array("productImage"), createProduct)

productRoute.route("/:id")
	// get a single product 
	.get(getProductById)
	// update a single product 
	.put(verifyToken, checkRole("admin", "editor"), upload.array("productImage"), updateProductById)
	// delete single product by id 
	.delete(verifyToken, checkRole("admin", "editor"), deleteProductById)


module.exports = productRoute;