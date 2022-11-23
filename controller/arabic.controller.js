const { getArabicProductsService } = require("../service/arabic.service");



// get product 
module.exports.getArabicProducts = async (req, res, next) => {
	try {
		const data = await getArabicProductsService();
		if (!data) {
			return res.status(400).json({ status: false, message:" Product Not Found" });
		}
		 res.status(200).json({ status: true, data});

	} catch (error) {
		next(error)
	}
}




// get single product by id
module.exports.getProductById = async (req, res, next) => {
	const { id } = req.params;
	
	try {
		const data = await getProductByIdService(id);
		if (!data) {
			 res.status(400).json({ status: false, message:"id not found" });
		}else{
			res.status(200).json({ status: true, data:data});
		}
	} catch (error) {
		next(error)
	}
}


// create products 
module.exports.createProduct = async (req, res, next) => {

	if (req.files === undefined || req.files === [] || req.files === '') {
		return res.status(400).json({ error: "please select file" });
	}
	const uploadedFiles = req.files;
	let filenames = []
	await uploadedFiles.map(file => filenames.push({ productImagePath: file.filename }));
	let bodyData = req.body;
	bodyData.productImage = filenames
	const data = await productCreateService(bodyData);

	try {

		if (!data) {
			return res.status(400).json({ status: false, message: "product uploaded failed" });
		}
		res.status(200).json({ status: true, message: "product create successful" });
	} catch (error) {
		// return res.status(400).json({ status: false, message: error.message });
		next(error)
	}
}