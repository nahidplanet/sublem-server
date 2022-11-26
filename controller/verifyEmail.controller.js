const User = require("../model/user.model");
const { verifyEmailService } = require("../service/verifyEmail.service");

module.exports.verifyEmail = async (req, res, next) => {
	const { token } = req?.params;
	try {
		if (!token) {
			return res.status(403).json({ status: false, message: "Invalid Token" });
		}
		const user = await verifyEmailService(token);
		if (!user) {
			return res.status(403).render("message",{title: "failed to activate",content:"Invalid token, please <a href='/singup'>sing up </a> here" })
		}
		const expire = new Date() > new Date(user.tokenExpire);
		if (expire) {
			return res.status(403).json({ status: false, message: "your token expire" });
		}
		user.status = "active";
		user.activeToken = undefined;
		user.tokenExpire = undefined;	
		user.save({validateBeforeSave:false})	
		return res.status(200).json({ status: true, message: "your account is activated" });

	} catch (error) {
		return res.status(403).json({ status: false, message: "Invalid Token" });

	}

}