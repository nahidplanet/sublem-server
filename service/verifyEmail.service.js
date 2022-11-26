const User = require("../model/user.model")

module.exports.verifyEmailService = async(token)=>{
	const user = await User.findOne({activeToken:token});
	return user;
}