const { productCreateService, getProductsService } = require("../service/product.service")


// get product 
module.exports.getProducts = async (req, res,next) => {
	try {
		const data = await getProductsService();
		if (data) {
			// return res.status(200).json({ status: true, data });
			return res.send(data)
		}
	} catch (error) {
		res.status(400).json({ status: false, message: error.message });
	}
}


// create products 
module.exports.createProduct = async (req, res,next) => {

	if (req.files === undefined || req.files === [] || req.files === '') {
		return res.status(400).json({error:"please select file"});
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