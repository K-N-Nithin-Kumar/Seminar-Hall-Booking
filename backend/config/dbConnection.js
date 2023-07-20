const mongoose = require("mongoose");

//Today Nightout ok
const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect("mongodb+srv://poojarii018:70NuGdSg0yRhVxOM@cluster0.qzbygiw.mongodb.net/")
        console.log("Database connected ",connect.connection.host , connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
