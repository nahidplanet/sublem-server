const User = require("../model/user.model");

module.exports.checkAdmin = (...roles) => {
	return async (req, res, next) => {
		const {email,password} = req.body;
		console.log(req.body);
		if (!email && !password) {
			return res.status(404).json({ status: false, message: "Email is required" })
		}
		if ( !password) {
			return res.status(404).json({ status: false, message: "Password is required" })
		}
		const admin = await User.findOne({ email: email });
		if (!admin) {
			return res.status(403).json({ status: false, message: "Unauthorize access" })
		}
		const role = admin?.role;
		if (!roles.includes(role)) {
			return res.status(403).json({ status: false, message: "Unauthorize access" })
		}
		next()
	}
};

