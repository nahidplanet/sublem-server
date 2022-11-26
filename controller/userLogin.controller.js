const { userLoginService } = require("../service/userLogin.service");
const User = require("../model/user.model");

module.exports.userLogin = async (req, res) => {

const {email ,password} = req.body;

	try {
		const tokenMail = req?.user;
		if (!email && password) {
			return res.status(404).json({status:false,message:"your email and password not correct"})
		}
		const result = await userLoginService(email);
		if (!result) {
			return res.status(404).json({status:false,message:"your email and password not correct"})
		}
		const checkPass =  result.comparePassword(password,result.password)
		if (!checkPass) {
			return res.status(403).json({status:false,message:"your email and password not correct"})
			
		}
		// if (result.status != 'active') {
		// 	return res.status(401).json({status:false,message:"please confirm your email"})
			
		// }

		
		
	} catch (error) {
		next(error)
	}

}