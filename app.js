const express = require('express');
const app = express();
const cors = require('cors');

const productRoute = require('./routes/v1/product.route');
const arabicRoute = require('./routes/v1/arabic.route');
const emailVerify = require('./routes/v1/emailVerify.route');
const loginRoute = require('./routes/v1/userLogin.route');
const adminRoute = require('./routes/v1/adminLogin.route');
const cartRoute = require('./routes/v1/cart.route');
const singUpRoute = require('./routes/v1/userRegistration.route');
const userRoute = require('./routes/v1/user.route');
const orderRoute = require('./routes/v1/order.route');
const AdminCheckRoute = require('./routes/v1/checkAdmin.route');
const RequireAuthRoute = require('./routes/v1/checkUser.route');



app.use(cors());
app.use(express.json());
app.use(express.static("public"));


//* =======================================
// admin Login
// =======================================
app.use("/api/v1/developer/login",adminRoute);
app.use("/api/v1/check-admin",AdminCheckRoute);
app.use("/api/v1/check-user",RequireAuthRoute);


//* =======================================
// user routes
// =======================================
app.use("/api/v1/login-user",loginRoute);
app.use("/api/v1/user-create",singUpRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/user-create/confirmation",emailVerify);

// =======================================
// product routes
// =======================================

app.use("/api/v1/product/",productRoute);
// 
// for arabic product category 
app.use("/api/v1/product/arabic",arabicRoute);
app.use("/api/v1/product/home",arabicRoute);
app.use("/api/v1/product/office",arabicRoute);
app.use("/api/v1/product/service",arabicRoute);

// product add to cart
app.use("/api/v1/product/cart",cartRoute);
// product add wishlist
app.use("/api/v1/product/wishlist",arabicRoute);
// product order
app.use("/api/v1/order/",orderRoute);







app.get("/", (req, res, next) => {
	res.status(200).send("welcome to sublem.com")
});
app.get("*", (req, res, next) => {
	res.status(404).send("Requested url is not found!")
});


module.exports = app;
