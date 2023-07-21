const mongoose = require("mongoose");

//Today Nightout ok
const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect("mongodb+srv://admin:<password>@ineuron.8h2plss.mongodb.net/seminar-hall?retryWrites=true&w=majority")
        console.log("Database connected ",connect.connection.host , connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
