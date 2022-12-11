const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const { getProductById } = require('../controller/product.controller');
const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
	fullName: {
		type: String,
		// required: [true, "your full name is required"],
		minLength: [3, 'your full name must be at least 3 characters'],
		lowercase: true,
		trim: true
	},
	addressOne: {
		type: String,
		// required: [true, "your address is required"],
		lowercase: true,
		trim: true
	},
	addressTwo: {
		type: String,
		// required: [true, "your address is required"],
		lowercase: true,
		trim: true
	},
	mobileNumber: {
		type: String,
		// required: [true, "mobile number is required"],
		validate: [validator.isMobilePhone, "please provide a valid contact number"],

	},
	email: {
		type: String,
		// required: [true, "your email is required"],
		validate: [validator.isEmail, "please provide a valid email"],
		lowercase: true,
		trim: true
	},
	role: {
		type: String,
		enum: ["admin", "user", "editor"],
		default: "user"
	},
	cartItems: [
		{
			productId: {
				type: ObjectId,
				ref: "Product",
				required:[true,"productId is required"]
			},
			price: {
				type: Number,
				required: [true, "cart product price required"]
			},
			quantity: {
				type: Number,
				default: 1
			}
		}
	],
	// cart: {
	// 	cartItems: [
	// 		{
	// 			product: {
	// 				type:ObjectId,
	// 				ref:"Product"
	// 			}
	// 		}
	// 	]
	// },
	wishlist: {
		type: Array,
		default: []
	},
	username: {
		type: String,
		// required: [true, "user name is required"],
		minLength: [3, 'your user name must be at least 3 characters'],
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: [true, "password is required"],
		validate: (value) => {
			validator.isStrongPassword(value, {
				minLength: 6,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1
			})
		},
		message: "password {value} is not strong enough",
	},
	confirmPassword: {
		type: String,
		// required: [true, "confirm password is required"],
		validate: function (value) {
			return value === this.password;
		},
		message: "password doesn't match!"
		,

	},
	status: {
		type: String,
		enum: ["active", "inactive", "block"],
		default: "inactive"
	},
	activeToken: String,
	tokenExpire: Date,
	passwordChangeAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
}, {
	timestamps: true
});

userSchema.pre("save", function (next) {
	const password = this.password;
	var salt = bcryptjs.genSaltSync(10);
	const hashPassword = bcryptjs.hashSync(password, salt);
	this.password = hashPassword;
	this.confirmPassword = undefined;
	next()
});

userSchema.methods.comparePassword = async function (password, hash) {
	const checkPassword = await bcryptjs.compareSync(password, hash);
	return checkPassword;

};

userSchema.methods.confirmationToken = function () {
	// this crypto is node code module 
	const createToken = crypto.randomBytes(32).toString('hex');
	this.activeToken = createToken;
	const date = new Date();
	date.setDate(date.getDate() + 1)
	this.tokenExpire = date;
	return createToken;
};


const User = mongoose.model("User", userSchema);
module.exports = User;