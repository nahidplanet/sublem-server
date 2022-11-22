module.exports.errorHandler = (error,req,res,next) =>{
	if (error) {
		return	res.status(500).json({status:false,message:"server error handler",error:error.message})
		
	}
}