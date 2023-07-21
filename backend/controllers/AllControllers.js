const mongoose=require("mongoose")
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")
const DepartmentSchema = require("../models/Department")
const BookingSchema=require("../models/Booking")
const Admin = require('../models/Admin');
//admin login function
// server/controllers/adminController.js

const validateEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const loginAdmin = asyncHandler(async(req,res)=>{
    //fetch the email and the password from the user(req.body)
    const {email , password} = req.body;
    //if any of the field is empty alert all the fileds are mandatory
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    //fetch the user by using his email idfrom the database
    const admin = await Admin.findOne({email});
    //if that user exists and the entered password mathches with hashed password in the database
    //here we are comparing the password with the hashed password of the user 
    //if matches provide the access token to the response
    if(admin && (await bcrypt.compare(password , admin.password))){
        res.status(200).json({message:"Login success"})
    }
    else{
        res.status(400);
        throw new Error("Invalid credentials")  
    }
});

//Department Creation function
const createDepartment = asyncHandler(async(req,res)=>{
    const { DeptName, DeptInchargeName, DeptInchargeEmail, DeptInchargePassword } = req.body;
    if (!DeptName || !DeptInchargeName || !DeptInchargeEmail || !DeptInchargePassword){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
     if (!validateEmail(DeptInchargeEmail)) {
         res.status(400);
         throw new Error("Invalid email format for department in-charge.");
     }
     //Email validation ends

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DeptInchargePassword , salt);
    console.log(hashedPassword)
    const dept = await DepartmentSchema.create({
        DeptName,
        DeptInchargeName,
        DeptInchargeEmail,
        DeptInchargePassword:hashedPassword
    })
    if(dept){
        res.status(201).json(dept);
    }
    else{
        res.status(400);
        throw new Error("Invalid user data")
    }
});










module.exports = {createDepartment,loginAdmin}