

// create product 
module.exports.getArabicProductsService = async () => {
	const result = await Product.find({selectCategory:"arabic"});
	return result;

}