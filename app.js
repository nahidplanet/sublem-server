const express = require('express');
const app = express();
const cors = require('cors');
const productRoute = require('./routes/v1/product.route');
const upload = require('./middleware/product.multer');
const Product = require('./model/product.model');



app.use(cors());
app.use(express.json());

app.use("/api/v1/product",productRoute);


app.get("/", (req, res, next) => {
	res.status(200).send("welcome to sublem.com")
});
app.get("*", (req, res, next) => {
	res.status(400).send("This is Wrong Route")
});


module.exports = app;













// app.post('/api/v1/product',upload.single("productImage"),async (req,res,next)=>{
// 	console.log(req.body);
// 	const result = await Product.create(req.body);
// 	res.status(200).json({status:true,data:result})
// })