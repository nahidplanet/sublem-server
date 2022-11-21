const Product = require("../model/product.model")

// create product 
module.exports.getProductsService = async () => {
	return result;

}

// create product 
module.exports.productCreateService = async (data) => {
	
	const result = await Product.create(data);
	return result;

}