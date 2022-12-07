const Product = require("../model/product.model")

// get all product 
module.exports.getProductsService = async (filters, queries) => {
	const products = await Product.find(filters)
		.select(queries.field)
		.sort(queries.sortBy)
	return products;
}



// get single product by id
module.exports.getProductByIdService = async (id) => {
	const result = await Product.find({ _id: id });
	return result;
}

// post single product by form-data
module.exports.productCreateService = async (data) => {
	const result = await Product.create(data);
	return result;

}



// update single product by id 
module.exports.updateProductByIdService = async (id, data) => {
	const result = await Product.findOneAndUpdate({ _id: id }, data,{new:true,upsert:true});
	return result;
}
// update single product by id 
module.exports.deleteProductByIdService = async (id) => {
	const result = await Product.deleteOne({ _id: id });
	return result;
}