const jwt = require('jsonwebtoken');
const { promisify } = require('util')


module.exports.verifyToken = async (req, res, next) => {
	
	try {
		const token = req?.headers?.authorization?.split(" ")[1];
		
		if (!token) {
			return res.status(401).json({ status: false, message: "you are not logged in" })
		}
		const decode = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
		
		req.user = decode;
		next()
	} catch (error) {
		return res.status(401).json({ status: false, message: "Invalid token" })

	}
}