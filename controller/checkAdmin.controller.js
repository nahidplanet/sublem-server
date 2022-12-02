module.exports.checkAdmin = async (req, res, next) => {
	try {
		const admin = await req?.user?.role;
		
		if (!admin) {
			return res.status(400).json({ status: false, admin: false, message: "Unauthorize Access" })
		} 
		if (admin === 'admin'){

			res.status(200).json({ status: true, admin })
		}

	} catch (error) {
		return res.status(400).json({ status: false, admin: false, message: "Unauthorize Access" })

	}
}