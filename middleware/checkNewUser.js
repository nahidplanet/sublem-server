const User = require("../model/user.model");

module.exports.checkNewUser = async (req, res, next) => {
	try {
		const email = req.body.email;
		const result = await User.find({ email: email });
	
		if (result.length !== 0) {
			return res.status(400).json({ status: false, message: "your email already registered" })
		}
	} catch (error) {
		next(error)
	}
	next();
}