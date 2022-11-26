const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
	fullName: {
		type: String,
		// required: [true, "your full name is required"],
		minLength: [3, 'your full name must be at least 3 characters'],
		lowercase: true,
		trim: true
	},
	address: {
		type: String,
		// required: [true, "your address is required"],
		lowercase: true,
		trim: true
	},
	mobileNumber: {
		type: Number,
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
	cart: {
		type: Array,
		default: []
	},
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
	activeToken:String,
	tokenExpire: Date,
	passwordChangeAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
}, {
	timestamps: true
});

userSchema.pre("save", function (next) {
	const password = this.password;
	const hashPassword = bcryptjs.hashSync(password, 10);
	this.password = hashPassword;
	this.confirmPassword = undefined;
	next()
});

userSchema.methods.comparePassword = function (password, hash) {
	const checkPassword = bcryptjs.compareSync(password, hash)
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