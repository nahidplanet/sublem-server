const { adminLoginService } = require("../service/arabic.service");
const { token } = require("../utils/createToken");

module.exports.adminLogin = async (req, res, next) => {
	try {
		
		const admin = await adminLoginService(req.body);
		if (!admin || admin.length < 1) {
			return res.status(400).json({ status: false, message:"Unauthorize access.." });
		}
		const accessToken = token(admin);
		// console.log("admin login ===>  ",accessToken);
		 res.status(200).json({ status: true, accessToken});

	} catch (error) {
		next(error)
	}
}
