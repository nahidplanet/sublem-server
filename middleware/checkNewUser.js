const User = require("../model/user.model");

module.exports.checkNewUser = async (req, res, next) => {
	try {
		const email = req.body.email;
		const result = await User.findOne({ email: email });
		const userFind = result ? true : false;
		if (userFind) {
			return res.status(200).json({ status: false, message: "your email already registered" })
		}else{
			next();
		}
	} catch (error) {
		next(error)
	}


}