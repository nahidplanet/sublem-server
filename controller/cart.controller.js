// add to cart 

const { addToCartService } = require("../service/cart.service");
module.exports.addToCart = async (req, res, next) => {
	try {
		const userId = req?.user?.id;
		const productId = req.params.id;

		const result = await addToCartService(userId, productId);
		console.log(result);
		if (result.modifiedCount == 0) {
			return res.status(404).json({ status: false, message: "cart add failed" });
		}
		return res.status(200).json({ status: true, message: "added to cart" });
	} catch (error) {
		next(error)
	}
}