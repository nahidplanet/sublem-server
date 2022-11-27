const { allUserService } = require("../service/user.service");

module.exports.allUser = async (req, res, next) => {
	try {
		const result = await allUserService();
		if (!result || result.length < 1) {
			return res.status(404).json({ status: false, message: "user not found" });
		}
		 res.status(200).json({ status: true, message: "success" ,user:result });
	} catch (error) {
		next(error)
	}
}