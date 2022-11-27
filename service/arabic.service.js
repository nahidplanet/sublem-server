const Product = require("../model/product.model")
const User = require("../model/user.model")

// create product 
module.exports.adminLoginService = async (data) => {
	const admin = User.find({ email: data.email });
	return admin;

}