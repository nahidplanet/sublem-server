const User = require("../model/user.model");

// add to cart 
module.exports.allUserService = async (userId,productId) =>{
	const result = await User.find();
	return result;
}