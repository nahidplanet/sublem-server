const app = require('./app');

require('dotenv').config();
const PORT = 5000;
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/errorHandler');


// database 
mongoose.connect(process.env.DATABASE_URL_LOCAL).then((x) => {
    console.log("database connected..");
}).catch(err => console.log(err));



// global error which can't handle express like : database or hosting etc  
// use end of  every project for security 
// process.on("unhandledRejection", (error) => {
//     console.log(error.name, error.message);
//     app.close(() => {
//         process.exit(1);
//     });
// });
// error handler 


app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`server is running ON....${PORT}`);
})