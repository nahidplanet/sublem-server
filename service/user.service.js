const User = require('../model/user.model');

// create user 
module.exports.createUserService = (data)=>{
	const result = User.create(data);
	return result;
}