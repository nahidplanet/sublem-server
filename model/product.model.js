const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
	name: {
		required:[true,'product name is required'],
		type: String,
		trim: true,
		lowercase: true,
	},
	code: {
		required:[true,'product code is required'],
		type: String,
		trim: true,
	},
	sortDescription: {
		required:[true,'product sort description is required'],
		type: String,
		trim: true,
	},
	longDescription: {
		required:[true,'product long Description is required'],
		type: String,
		trim: true,
	},
	price: {
		required:[true,'product price is required'],
		type: Number,
		trim: true,
		validate: {
			validator: (value) => {
				const isInteger = Number.isInteger(value)
				if (isInteger) {
					return true;
				} else {
					const toInteger = parseInt(value)
					return toInteger;
				}
			},
			message: "regular price must be a number"
		}
	},
	color:{
		type:String
	},
	feature:{
		type:String
	},
	discount: {

		type: Number,
		trim: true,
		validate: {
			validator: (value) => {
				const isInteger = Number.isInteger(value)
				if (isInteger) {
					return true;
				} else {
					const toInteger = parseInt(value)
					return toInteger;
				}
			},
			message: "new Price must be a number"
		}
	},
	category: {
		required:[true,'product category is required'],
		enum: {
			values: ["arabic","home","office","service"],
			message: "Product category :{VALUE} is not valid"
		},
		type: String,
		trim: true,
		lowercase: true,
	},
	type: {
		type: String,
		required:[true,'product type is required'],
		trim: true,
		lowercase: true,
		enum: {
			values: ["sofa", "bed", "carpet", "mattress", "curtain", "wallpaper","cabinets","gypsum","panting"],
			message: "Product Type :{VALUE} is not valid"
		}
	},
	productImage: [
		{
			productImagePath: {
				type: String,
				required: [true, "this is product image path...it's required."]
			}

		}

	],
	status: {
		type: String,
		required: [true, "product status is require"],
		enum: ["active", "deactivate"],
		default: "active",
		lowercase: true
	},
	quantity: {
		type: Number,
		required: [true, "product quantity is require"],
		validate: {
			validator: (value) => {
				const isInteger = Number.isInteger(value)
				if (isInteger) {
					return true;
				} else {
					const toInteger = parseInt(value)
					return toInteger;
				}
			},
			message: "quantity must be a number"
		}
	},
},
	{
		timestamps: true,
	})



const Product = mongoose.model("Product", productSchema);
module.exports = Product;