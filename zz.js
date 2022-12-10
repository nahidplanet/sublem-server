/*
		step: 1 check user already exist or not
		step: 2 save database
		step: 3 confirmToken create from user model methods
		step: 4 save user with active token with {validateBeforeSave:false}
		step: 5 send mail for user active account
		step: 6 create route for active user
		step: 7 get user token from email path and find user
		step: 8 make sure token and check user
		step: 9 check the token date is available or not
		step: 10 re-set user status, remove user token and remove tokenExpire date
		step: 11 user.save({validateBeforeSave:false}) ;
		token from utile folder 

		routes
		======================================================
		get single product by {id} = http://localhost:5000/api/v1/product/63835c6f8f7f324740861c20
		update single product by {id} and {body} = http://localhost:5000/api/v1/product/63835c6f8f7f324740861c20


cart controller
===================
// add to cart 

const User = require("../model/user.model");
const { addToCartService } = require("../service/cart.service");
module.exports.addToCart = async (req, res, next) => {
	try {
		const userId = req?.user?.id;
		const productInfo = req.body;
		const { productId, price, quantity } = productInfo;


		const cart = await addToCartService(userId, productInfo);
		if (!cart) {
			return res.status(404).json({ status: false, message: "cart add failed" });
		} else {

			const filter = cart.cart.find(single => single.productId == productId)

			if (!filter) {

				const added = await User.updateOne({ _id: userId },
					{
						$set: {
							cart: {
								...productInfo,
								quantity: filter.quantity + quantity
							}
						}
					}
				)
				console.log("added", added);
			} else {
				// update quantity in this box
				const update = await User.updateOne({ _id: userId }, {
					cart: {
						'$set': filter
					}

				})
				console.log("updated ===> ", update);
			}

			// return res.status(200).json({ status: true, message: "cart add sucess" });

		}

	} catch (error) {
		next(error)
	}
}



cart service ============================

const User = require("../model/user.model")

// add to cart 
module.exports.addToCartService = async (userId, productInfo) => {
	// const { productId, price, quantity } = productInfo;

	const cart = await User.findOne({ _id: userId });
	return cart


}




===========================================================================================
module.exports.addToCart = async (req, res, next) => {
	try {
		const userId = req?.user?.id;
		const type = req.params.type;
		const productInfo = req.body;

		if (type === "add") {
			let duplicate = false;
			const user = await User.findOne({ _id: userId });
			if (user) {
				user.cart.map(item => {
					if (item.productId === productInfo.productId) {
						duplicate = true
					}
				})
			}


			if (!duplicate) {
				await User.findOneAndUpdate(
					{ _id: req?.user?.id },
					{ $push: { cart: { productId: req.body.productId,price:productInfo.price} } }
				).then(response => {
					res.status(200).json({ status: true, message: "product added" });
				}).catch(error => {
					res.status(404).json({ status: false, message: error.message })

				})
			} else {
				// if product duplicate then update value 
				const user = await User.findOneAndUpdate(
					{ _id: userId, "cart.productId": productInfo.productId }, {
					$inc: { "cart.$.quantity": 1 }
				}
				).then(response => {
					res.status(200).json({ status: true, message: "product increment" });
				}).catch(error => {
					res.status(404).json({ status: false, message: error.message })

				})
			}
		}



		// product quantity decrement 
		if (type === "sub") {
			const user = await User.findOneAndUpdate(
				{ _id: userId, "cart.productId": productInfo.productId }, {
				$inc: { "cart.$.quantity": -1 }
			}
			).then(response => {
				res.status(200).json({ status: true, message: "product decrement" });
			}).catch(error => {
				return res.status(404).json({ status: false, message: error.message })

			})
		}




	} catch (error) {
		next(error)
	}
}






*/