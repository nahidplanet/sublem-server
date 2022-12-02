const User = require("../model/user.model");

module.exports.RequireAuth = async (req, res, next) => {
	try {
		const user = await req?.user?.role;
		if (!user) {
			return res.status(400).json({ status: false, user: false, message: "You are not login" })
		} else {

			res.status(200).json({ status: true, user })
		}

	} catch (error) {
		return res.status(400).json({ status: false, user: false, message: "You are not login" })

	}
}