const User = require("../model/user.model");

module.exports.checkEmailVerify = async (req, res, next) => {
	const id = req?.user?.id;
	const user = await User.findOne({ _id: id })
	if (user?.status !== "active") {
		return res.status(403).json({ status: false, message: "verify your email before order" })
	}else{
		next();
	}
}