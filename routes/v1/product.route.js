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
	.get(verifyToken,checkRole("user","admin","editor"), getProducts)
	// get all product 
	.get(getProducts)
	// create a product 
	.post(verifyToken,checkRole("admin","editor"), upload.array("productImage"), createProduct)
	
productRoute.route("/:id")
// get a single product 
	.get(getProductById)
	// update a single product 
	.patch(updateProductById)
	// delete single product by id 
	.delete(deleteProductById)


module.exports = productRoute;