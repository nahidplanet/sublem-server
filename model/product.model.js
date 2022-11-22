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
	regularPrice: {
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
			message: "quantity must be a number"
		}
	},
	newPrice: {
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
			message: "quantity must be a number"
		}
	},
	selectCategory: {
		type: String,
		trim: true,
		lowercase: true,
	},
	productType: {
		type: String,
		trim: true,
		lowercase: true,
		enum: {
			values: ["sofa", "bed", "carpet","bed_mattress","curtain","wallpaper"],
			message: "Product Type :{VALUE} is not valid"
		}
	},
	productImage: [
		{
			productImagePath: {
				type: String,
				required: [true,"this is product image path...it's required."]
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
},
	{
		timestamps: true,
	})



const Product = mongoose.model("Product", productSchema);
module.exports = Product;