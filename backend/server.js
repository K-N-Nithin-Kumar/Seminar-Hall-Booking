const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/AllRoutes");


//to create api
const app = express();


//middlewares
app.use(express.json());


//connection to database
mongoose.connect("mongodb+srv://poojarii018:70NuGdSg0yRhVxOM@cluster0.qzbygiw.mongodb.net/").then(() => {
    console.log("Connection SuccesFull to the database");
}).catch((err) => {
    console.log(err)
})


//routers
app.use("/api/main/", mainRouter)

const PORT=5000
app.listen(PORT, () => {
    console.log(`The port is Running at ${PORT}!`);
})


//Dependency validator has been added use "npm install to update the dependency"
//checkValidemail function has been added in allcontroller.js
//codes.js file updated with status code 409 for email already exist and the same reflected in errorhandler.js
//Department cannot register twice and registered email with department cannot be used with any other derpartment registration.
