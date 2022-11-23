const mongoose = require('mongoose');
const validator = require('validator');

const userSchema= mongoose.Schema({
	fullName:{
		type:String,
		min: [3, 'Must be at least 3, got {VALUE}'],
		lowercase:true,
	},
	address:{
		type:String,
		min: [3, 'Must be at least 3, got {VALUE}'],
		lowercase:true,
	},
	mobile:{
		type:Number,
		min: [8, 'Must be at least 8, got {VALUE}'],
		
	},
	email:{
		type:String,
		required:[true,"user email is required"],
		validate:[validator.isEmail,"please provide a valid email"],
		lowercase:true,
	},
	role:{
		type:String,
		enum:["admin","user","editor"],
		default:"user"
	},
	cart:{
		type:Array,
		default:[]
	},
	wishlist:{
		type:Array,
		default:[]
	},
	username:{
		type:String,
		required:[true,"user name is required"],
		min: [3, 'Must be at least 3, got {VALUE}'],
		lowercase:true,
	},
	password:{
		type:String,
		min: [6, 'Must be at least 6, got {VALUE}'],
	},
	confirmed:{
		type:Boolean,
		default:false
	},
	activeToken:{
		type:String
	},
	id:{
		type:String
	}
},{
	timestamps:true
})

const User = mongoose.model("User",userSchema);
module.exports = User;