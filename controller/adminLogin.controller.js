const { adminLoginService } = require("../service/arabic.service");
const { token } = require("../utils/createToken");
const bcrypt = require('bcryptjs');

module.exports.adminLogin = async (req, res, next) => {
	console.log(req.body);
	try {
		const {email,password} = req.body;
		if (!email && !password) {
			return res.status(404).json({ status: false, message: "your email and password not correct" })
		}
		const admin = await adminLoginService(req.body);
		// check password 
		// const isPassword = bcrypt.compareSync(req.body.password, admin.password);
		// console.log("is pussword",isPassword);
		// if (!isPassword) {
		// 	return res.status(404).json({ status: false, message:"invalid Email and Password" });
		// }
		if (!admin || admin.length < 1) {
			return res.status(400).json({ status: false, message:"Unauthorize access.." });
		}
		const accessToken = token(admin[0]);
		// console.log("admin login ===>  ",accessToken);
		 res.status(200).json({ status: true, accessToken});

	} catch (error) {
		console.log(error)
	}
}
