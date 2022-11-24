const User = require("../model/user.model");
const { createUserService } = require("../service/user.service");
const { token } = require("../utils/createToken");
// const { sendMail, mailGun } = require("../utils/sendMail");



// create a user 
module.exports.createUser = async (req, res, next) => {
	try {
		// token from utile folder 
		const jwtToken = token(req.body.email);


		// send email this token 
		// const mailData = {
		// 	to: [req.body.email],
		// 	subject: "Verify Your sublem Account",
		// 	text: "thank you to stay us",
		// }
		// mailGun(mailData);
		// ===============================================================================
		//  free gmail 
		// ===============================================================================
		// send mail by send-gamil 
		const send = require("gmail-send")({
			user: "sknahid.cc@gmail.com",
			pass: process.env.APP_PASS_FOR_MAIL,
			to: req?.body?.email,
			subject: "Activate your account",
			html:
				'<p>Click <a href="http://localhost:5000/verify-email/' +
				jwtToken +
				'">here</a> to activate your account</p>',
		});

		send({
				text: "Thank you for stay with us",
			},
			(error, result, fullResult) => {
				if (error) {
					return res.status(404).json({
						massage: "gmail sent problem",
						status: false,

					});
				} else {
					req.body.token = jwtToken;
					const newUser = new User({
						...req?.body
					});
					const result = createUserService(newUser);
					if (!result) {
						return res.status(400).json({ status: false, message: "user create failed" })
					}
					res.status(200).json({ status: true, email: "check your email", message: "user create successful", jwtToken })
				}
			}
		);

		// ======================================================================================
		
	} catch (error) {
		next(error)
	}
}