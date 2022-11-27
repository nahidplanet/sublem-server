
const { userLoginService } = require("../service/userLogin.service");
const { token } = require("../utils/createToken");

module.exports.userLogin = async (req, res, next) => {

	const { email, password } = req.body;

	try {
		// const tokenMail = req?.user;
		if (!email && password) {
			return res.status(404).json({ status: false, message: "your email and password not correct" })
		}
		const user = await userLoginService(email);

		if (!user) {
			return res.status(404).json({ status: false, message: "your email and password not correct" })
		}
		const checkPass = user.comparePassword(password, user.password)
		console.log("checkPassword login controller",checkPass);
		if (!checkPass) {
			return res.status(403).json({ status: false, message: "your email and password not correct..." })
		}
		const accessToken = token(user);

		const { password: userPassword, ...others } = user.toObject()

		res.status(200).json({ status: true, message: "login successful", accessToken })
	} catch (error) {
		next(error)
	}

}