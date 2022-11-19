const express = require('express');
const app = require('./app');
const PORT = process.env.PORT || 5000;












app.get("/", (req, res, next) => {
	res.status(200).send("welcome to sublem.com")
})
app.get("*", (req, res, next) => {
	res.status(200).send("This is Wrong Route")
})
app.listen(PORT, () => {
	console.log("sublem serve is runnig on" + PORT);
})