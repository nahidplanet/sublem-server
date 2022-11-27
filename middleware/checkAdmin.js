const User = require("../model/user.model");

module.exports.checkAdmin = (...roles) => {
	return async (req, res, next) => {
		const email =req.body.email;
		const user = await User.findOne({email:email})
		const role = user[0]?.role;
		if (!roles.includes(role)) {
			return res.status(403).json({ status: false, message: "Unauthorize access" })
		}
		next()
	}
};

