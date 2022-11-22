const express = require('express');
const app = express();
const cors = require('cors');
const productRoute = require('./routes/v1/product.route');
const upload = require('./middleware/product.multer');
const Product = require('./model/product.model');



app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/product",productRoute);


app.get("/", (req, res, next) => {
	res.status(200).send("welcome to sublem.com")
});
app.get("*", (req, res, next) => {
	res.status(404).send("Requested url is not found!")
});


module.exports = app;
