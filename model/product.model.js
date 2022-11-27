const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		lowercase: true,
	},
	code: {
		type: String,
		trim: true,
	},
	sortDescription: {
		type: String,
		trim: true,
	},
	longDescription: {
		type: String,
		trim: true,
	},
	price: {
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
		type:Boolean,
		enum:[true,false],
		default:false,
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
		type: String,
		trim: true,
		lowercase: true,
	},
	type: {
		type: String,
		trim: true,
		lowercase: true,
		enum: {
			values: ["sofa", "bed", "carpet", "bed_mattress", "curtain", "wallpaper"],
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
		required: [true, "status is require"],
		enum: ["active", "deactivate"],
		default: "active",
		lowercase: true
	},
	quantity: {
		type: Number,
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
	stock: {
		type: Number,
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
			message: "stock must be a number"
		}
	}
},
	{
		timestamps: true,
	})



const Product = mongoose.model("Product", productSchema);
module.exports = Product;