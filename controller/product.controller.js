const { productCreateService, getProductsService } = require("../service/product.service")


// get product 
module.exports.getProducts = async (req, res) => {
	try {
		const data = await getProductsService();
		if (data) {
			return res.status(200).json({status:true,data});
		}
	} catch (error) {
		res.status(400).json({status:false,message:error.message});
	}
}
// create products 
module.exports.createProduct = async (req, res) => {
	const uploadedFiles = req.files;
	

	let filenames = []
	await uploadedFiles.map(file=> filenames.push({productImagePath:file.filename}));

	// console.log("uploaded Files",uploadedFiles);
let bodyData = req.body;
bodyData.productImage = filenames

	try {
		const data = await productCreateService(bodyData);
		if (data) {
			return res.status(200).json({status:true,message:"product create successful"});
		}
	} catch (error) {
		res.status(400).json({status:false,message:error.message});
	}
}