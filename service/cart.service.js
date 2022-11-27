const User = require("../model/user.model")

// add to cart 
module.exports.addToCartService = async (userId, productId) => {
	const result = await User.updateOne({ _id:userId },{$push:{cart:productId}})
	return result;
}