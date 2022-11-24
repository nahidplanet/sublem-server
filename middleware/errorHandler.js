module.exports.errorHandler = (error,req,res,next) =>{
	if (error) {
		return	res.status(500).json({status:false,message:"catch by errorHandler",error:error.message})
		
	}
}