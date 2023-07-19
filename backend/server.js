const express = require("express");
const connectDB = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
connectDB();
const port = process.env.PORT || 5000;
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})
