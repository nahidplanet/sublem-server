const express = require('express');
const app = express();
const cors = require('cors');
const productRoute = require('./routes/v1/product.route');
const upload = require('./middleware/product.multer');
const Product = require('./model/product.model');
const arabicRoute = require('./routes/v1/arabic.route');
const userRoute = require('./routes/v1/userRegistration.route');
const emailVerify = require('./routes/v1/emailVerify.route');
const loginRoute = require('./routes/v1/userLogin.route');



app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/product",productRoute);
app.use("/api/v1/arabic",arabicRoute);
app.use("/api/v1/user-create",userRoute);
app.use("/api/v1/user-create/confirmation",emailVerify);
app.use("/api/v1/login-user",loginRoute);


app.get("/", (req, res, next) => {
	res.status(200).send("welcome to sublem.com")
});
app.get("*", (req, res, next) => {
	res.status(404).send("Requested url is not found!")
});


module.exports = app;
