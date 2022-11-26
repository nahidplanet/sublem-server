const jwt = require('jsonwebtoken');

module.exports.token = (userEmail) =>{
	const payload ={
		email:userEmail,
	}
	const activeToken = jwt.sign(payload,process.env.SECRET_KEY,{
		expiresIn:'40'
	});
	return activeToken;
}