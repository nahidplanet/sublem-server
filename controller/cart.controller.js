
const User = require("../model/user.model");
const { deleteToCartService, deleteFullCartService, userGetCartService } = require("../service/cart.service")


// add to cart 
module.exports.addToCart = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const cartItems = req.body;
		const user = await User.find({ _id: userId });
		if (!user || user.length < 1) {
			return res.status(400).json({ status: false, message: "Invalid User", error: "user not find by id" });
		} else {
			const abc = await User.findOne({ "cartItems.productId": { $in: [req.body.productId] } })
			if (!abc) {
				const result = await User.updateOne({ _id: userId }, { $push: { cartItems: { productId: req.body.productId, price: req.body.price, quantity: req.body.quantity } } })
				return res.status(200).json({ status: true, message: "new Product add" });
			} else {
				const increase = await User.updateOne({ "cartItems.productId": { $in: [req.body.productId] } }, { $inc: { "cartItems.$.quantity": 1 } })
				return res.status(200).json({ status: true, message: "product increase" });
			}
		}
	} catch (error) {
		next(error)
	}
}
// user all get carts 
module.exports.userGetCart = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const result = await userGetCartService(userId);
		if (!result || result.length < 1) {
			return res.status(400).json({ status: false, message: "Card is Blank" });
		} else {
			res.status(200).json({ status: true, result, })
		}
	} catch (error) {
		next(error)
	}
}

// product delete to cart 
module.exports.deleteToCart = async (req, res, next) => {
	
	try {
		const productId = req.params?.productId
		const userId = req?.user?.id;
		const result = await deleteToCartService(userId, productId);
		if (result?.acknowledged || result?.modifiedCount > 0) {
			res.status(200).json({ status: true, message: "product deleted success" })
		} else {
			return res.status(400).json({ status: false, message: "product deleted failed" })
		}
	} catch (error) {
		// next(error)
		res.json({ error: error.message })
	}
}

// product delete full  cart 
module.exports.deleteFullCart = async (req, res, next) => {
	try {
		const userId = req?.user?.id;
		const result = await deleteFullCartService(userId)
		if (!result) {
			return res.status(400).json({ status: false, message: "cart empty failed" })
		} else {
			res.status(200).json({ status: true, message: "cart is empty " })
		}
	} catch (error) {
		next(error)
	}
}


