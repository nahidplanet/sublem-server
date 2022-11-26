const User = require("../model/user.model");
const { createUserService } = require("../service/userRegistration.service");
// const { sendMail, mailGun } = require("../utils/sendMail");



// create a user 
module.exports.createUser = async (req, res, next) => {
	
	try {

		// step: 1 check user already exist or not
		// step: 2 save database
		// step: 3 confirmToken create from user model methods
		// step: 4 save user with active token with {validateBeforeSave:false}
		// step: 5 send mail for user active account
		// step: 6 create route for active user
		// step: 7 get user token from email path and find user
		// step: 8 make sure token and check user
		// step: 9 check the token date is available or not
		// step: 10 re-set user status, remove user token and remove tokenExpire date
		// step: 11 user.save({validateBeforeSave:false}) ;
		// token from utile folder 

		const user = await createUserService(req.body);
		// bcryptToken from user mode Methods 
		const bcryptToken =  user.confirmationToken();

		await user.save({validateBeforeSave:false})
		// ======================================================================================
		// send active link for user 
		const send = require("gmail-send")({
			user: "sknahid.cc@gmail.com",
			pass: process.env.APP_PASS_FOR_MAIL,
			to: req?.body?.email,
			subject: "Activate your account",
			html:`
			<p>Thank you to creating your account. please Click <a href="${req.protocol}://${req.get("host")}${req.originalUrl}confirmation/${bcryptToken}
			">here</a> to confirm your account</p>`,
		});

		send({
			text: "Thank you for stay with us",
		},
			(error, result, fullResult) => {
				if (error) {
					return res.status(404).json({
						massage: "active account but gmail not send",
						status: false,

					});
				} else {
					return res.status(200).json({
						massage: "your account create successful please check your email",
						status: true,
					});
				}
			}
		);
		// ======================================================================================

	} catch (error) {
		next(error)
	}
}