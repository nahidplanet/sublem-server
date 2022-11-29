// add to cart 


const User = require("../model/user.model");
const { deleteToCartService } = require("../service/cart.service")






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
					{ $push: { cart: { productId: req.body.productId, quantity: 1 } } }
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
				res.status(404).json({ status: false, message: error.message })

			})
		}




	} catch (error) {
		next(error)
	}
}



// product delete to cart 
module.exports.deleteToCart = async (req, res, next) => {
	const productId = req.params?.productId
	const userId = req?.user?.id;

	const result = await deleteToCartService(userId, productId);

	if (result?.acknowledged || result?.modifiedCount > 0) {
		res.status(200).json({ status: true, message: "product deleted success" })
	} else {
		res.status(400).json({ status: false, message: "product deleted failed" })
	}

}


