const Product = require("../model/product.model")

// get all product 
module.exports.getProductsService = async () => {
	const result = await Product.find();
	return result;

}
// get single product by id
module.exports.getProductByIdService = async (id) => {
	const result = await Product.find({_id:id});
	return result;

}

// post single product by form-data
module.exports.productCreateService = async (data) => {
	const result = await Product.create(data);
	return result;

}



// update single product by id 
module.exports.updateProductByIdService = async (id,data) => {
	const result = await Product.updateOne({_id:id},{$set:data});
	return result;

}
// update single product by id 
module.exports.deleteProductByIdService = async (id) => {
	const result = await Product.deleteOne({_id:id});
	return result;

}