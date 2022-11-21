module.exports.errorHandler = (error,req,res,next) =>{
	if (error) {
		res.status(400).json({status:false,message:"server error handler",error:error.message})
		next();
	}
}