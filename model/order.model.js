const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const OrderSchema = mongoose.Schema({

	userId: {
		type: ObjectId,
		ref: "User"
	},
	products: {
		type: Array,
		default: []
	},
	addressOne: {
		type: String
	},
	addressTwo: {
		type: String
	},
	total: {
		type: Number
	},
	paymentId: {
		type: Number,
	},
	paymentMethod: {
		type: String
	},
	DateOfPurchase: Date,
	orderStatus: String,

}, {
	timestamps: true
});




const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;