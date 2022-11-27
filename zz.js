/*
		step: 1 check user already exist or not
		step: 2 save database
		step: 3 confirmToken create from user model methods
		step: 4 save user with active token with {validateBeforeSave:false}
		step: 5 send mail for user active account
		step: 6 create route for active user
		step: 7 get user token from email path and find user
		step: 8 make sure token and check user
		step: 9 check the token date is available or not
		step: 10 re-set user status, remove user token and remove tokenExpire date
		step: 11 user.save({validateBeforeSave:false}) ;
		token from utile folder 

		routes
		======================================================
		get single product by {id} = http://localhost:5000/api/v1/product/63835c6f8f7f324740861c20
		update single product by {id} and {body} = http://localhost:5000/api/v1/product/63835c6f8f7f324740861c20















*/