const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

module.exports.token = (user) => {
	const payload = {
		email: user.email,
		role: user.role,
		id: user.id,
	}
	const activeToken = jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: '1d'
	});
	return activeToken;
}