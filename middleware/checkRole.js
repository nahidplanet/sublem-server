module.exports.checkRole =(...role)=>{
	return (req,res,next)=>{
		const userRole = req.user.role;
		if (!role.includes(userRole)) {
			return res.status(403).json({status:false,message:"you are not authorize to access this"})
			
		}
		next()
	}
}