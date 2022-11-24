const User = require('../model/user.model');

// create user 
module.exports.createUserService = async (data)=>{
	const result = await User.create(data);
	return result;
}