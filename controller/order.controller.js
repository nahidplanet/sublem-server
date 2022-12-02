const { getAllOrdersService, getOrderByIdService, createOrderService, deleteOrderService } = require("../service/order.service")

// get all order 
module.exports.getAllOrders = async (req, res, next) => {
	try {

		const result = await getAllOrdersService()
		if (!result || result.length < 1) {
			return res.status(404).json({ status: false, message: "no order found" })
		}
		res.status(200).json({ status: true, order: result })

	} catch (error) {
		next(error)
	}
}


// get order by id 
module.exports.getOrderById = async (req, res, next) => {
	try {

		const userId = req?.user?.id;

		const result = await getOrderByIdService(userId)
		if (!result || result.length < 1) {
			return res.status(404).json({ status: false, message: "no order found" })
		}
		res.status(200).json({ status: true, order: result })
	} catch (error) {
		next(error)
	}

}
// create order by id 
module.exports.createOrder = async (req, res, next) => {

	try {
		const data = req.body;
		const userId = req?.user?.id;
		const result = await createOrderService({...data,userId})


		if (!result || result.length < 1) {
			return res.status(404).json({ status: false, message: "order failed" })
		}
		res.status(200).json({ status: true,message:"order submitted", order: result })

	} catch (error) {
		next(error)
	}
}
// delete order by id 
module.exports.deleteOrder = async (req, res, next) => {

	try {
		const data = req.body;
		const userId = req?.user?.id;
		const result = await deleteOrderService(userId)


		if (!result || result.length < 1) {
			return res.status(404).json({ status: false, message: "no order found" })
		}
		res.status(200).json({ status: true, order: result })

	} catch (error) {
		next(error)
	}
}