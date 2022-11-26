const User = require("../model/user.model")

module.exports.userLoginService =async (email)=>{
	const result = User.findOne({email:email})
	return result;
}