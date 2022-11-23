const Product = require("../model/product.model")

// create product 
module.exports.getProductsService = async (category) => {
	const result = await Product.find({selectCategory:category});
	return result;

}
// get single product by id
module.exports.getProductByIdService = async (id) => {
	const result = await Product.find({_id:id});
	return result;

}

// create product 
module.exports.productCreateService = async (data) => {
	
	const result = await Product.create(data);
	return result;

}