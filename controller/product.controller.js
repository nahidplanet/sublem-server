
const {
	productCreateService,
	getProductsService,
	getProductByIdService,
	updateProductByIdService,
	deleteProductByIdService
} = require("../service/product.service")




// =========================
// get product all
// =========================
module.exports.getProducts = async (req, res, next) => {
	try {

		// step 0: copy the query ;
		let filters = { ...req.query };
		const queries = {};
		const excludeFields = ['sort', 'page', 'limit', "field"]
		excludeFields.forEach(field => delete filters[field]);

		let filterString = JSON.stringify(filters);
		filterString = filterString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
		filters = JSON.parse(filterString);
		// step 1: create a empty string;
	

		// step 2: sort multiple value ;
		//{{URL}}/product?sort=stock,-name
		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ');
			queries.sortBy = sortBy;
		}
		// step 3: field (ki ki show korabo ba korabo na);
		//{{URL}}/product?sort=stock,-name&field=name,price
		if (req.query.field) {
			const fieldBy = req.query.field.split(',').join(' ');
			queries.field = fieldBy;
		}
		// step 4: field (ki ki show korabo ba korabo na);
		//{{URL}}/product?sort=price,-name&field=name,price,-_id&category=home
		if (req.query.category) {
			const categoryBy = req.query.category.split(',').join(' ');
			queries.category = categoryBy;
		}

		if (req.query.price) {

			// const priceBy = req.query.price.split(',').join(' ');
			// queries.price = priceBy;
		}






		const data = await getProductsService(filters,queries);


		if (!data || data.length < 1) {
			return res.status(404).json({ status: false, message: "no data found" });
		}
		res.status(200).json({ status: true, message: "success", data: data });
	} catch (error) {
		next(error);
	}
}



// =============================
// get single product by id
// =============================
module.exports.getProductById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const data = await getProductByIdService(id);
		if (!data || data.length < 1) {
			res.status(404).json({ status: false, message: "Invalid id" });
		} else {
			res.status(200).json({ status: true, data: data });
		}
	} catch (error) {
		next(error)
	}
}




// ============================
// create products 
// =============================
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
		if (!data || data.length < 1) {
			return res.status(400).json({ status: false, message: "product uploaded failed" });
		}
		res.status(200).json({ status: true, message: "product create successful" });
	} catch (error) {
		// return res.status(400).json({ status: false, message: error.message });
		next(error)
	}
}






// ===========================
// update product by id and body
// ============================

module.exports.updateProductById = async (req, res, next) => {
	const { id } = req.params;
	const data = req.body;
	const result = await updateProductByIdService(id, data);

	try {
		if (!result || result.length < 1 || result.modifiedCount == 0) {
			return res.status(404).json({ status: false, message: "Invalid id" });
		}
		res.status(200).json({ status: true, message: "success", result: result });
	} catch (error) {
		next(error)
	}
}





// ===========================
// delete product by id and body
// ============================

module.exports.deleteProductById = async (req, res, next) => {
	const { id } = req.params;
	const result = await deleteProductByIdService(id);

	try {
		if (!result || result.length < 1 || result.deletedCount == 0) {
			return res.status(404).json({ status: false, message: "Invalid id" });
		}
		res.status(200).json({ status: true, message: "success", result: result });
	} catch (error) {
		next(error)
	}
}