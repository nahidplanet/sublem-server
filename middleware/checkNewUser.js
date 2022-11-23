const User = require("../model/user.model");

module.exports.checkNewUser = async (req, res, next) => {
	try {
		const email = req.body.email;
		const result = await User.findOne({ email: email });
	
		if (result.length !== 0) {
			return res.status(200).json({ status: false, message: "your email already registered" })
		}
	} catch (error) {
		next(error)
	}
	next();
}