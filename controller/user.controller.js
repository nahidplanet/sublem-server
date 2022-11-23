const { createUserService } = require("../service/user.service")



// create a user 
module.exports.createUser = async (req,res,next)=>{
	try {
		const result = await createUserService(req.body)
		if (!result) {
		return	res.status(400).json({status:false,message:"user create failed"})
		}
		res.status(200).json({status:true,message:"user create successful"})

	} catch (error) {
		next(error)
	}
}