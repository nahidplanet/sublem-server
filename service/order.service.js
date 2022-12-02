const Order = require("../model/order.model")



module.exports.getAllOrdersService = async () => {
	const result = await Order.find() //.populate("userId");
	return result;
}

// get order by id 
module.exports.getOrderByIdService = async (userId) => {
	const result = await Order.findOne({ id: userId })
	return result;
}
// create order by id 
module.exports.createOrderService = async (data) => {

	const result = await Order.create(data)
	return result;
}
// delete order by id 
module.exports.deleteOrderService = async (id) => {

	const result = await Order.remove({userId:id})
	return result;
}