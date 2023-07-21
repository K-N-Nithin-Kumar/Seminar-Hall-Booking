const mongoose=require("mongoose")
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")
const AdminSchema = require("../models/Admin");
const DepartmentSchema = require("../models/Department")
const BookingSchema=require("../models/Booking")
const validator=require("validator")


//email validator function
const checkValidEmail = (email,res) => {
    if (!validator.isEmail(email)) {
        res.status(409);
        throw new Error("Invalid email format.");
    }
}

//admin login function
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log(email,password)

    if (!email || !password) {
        res.json({ error: "Please Provide Valid Credentials" });
    }

    checkValidEmail(email,res);

    const AdminLogin = await AdminSchema.findOne({ email: email })
    
    console.log(AdminLogin)
   
 
    if (AdminLogin === null || AdminLogin.password !== password) {
        res.json({ error: "Incorrect email or password" })
    } else {
        res.json({ message: "Succesfully Logged In" })
    }
});


/*
  Code wriiten by Keshav(YOU)

  "READ THIS:Instead of try catch we can directly use the express-async-handler package to handle asyncronus events
  Reference I sent in group read"

  const createDepartment = async (req, res) => {
    const { DeptName, DeptInchargeName, DeptInchargeEmail, DeptInchargePasswrd } = req.body;

    try {
        const new_department = await DepartmentSchema.create({ DeptName, DeptInchargeName, DeptInchargeEmail, DeptInchargePasswrd });
        res.status(200).json(new_department);s
    } catch (err) {
        res.status(400).json({ err });
    }


   


}
*/

//Department Creation function
const createDepartment = asyncHandler(async(req,res)=>{
    const { DeptName, DeptInchargeName, DeptInchargeEmail, DeptInchargePassword } = req.body;
    // "ISSUE"
    // DeptName is not getting from the request 
    // path error
    //below log printing undefined resolve this 
    //hashing is done
    //validatioin is done
    console.log(DeptName);
    
    if (!DeptName || !DeptInchargeName || !DeptInchargeEmail || !DeptInchargePassword){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const upperCaseDeptName = DeptName.toUpperCase();

    const deptNameRegistered = await DepartmentSchema.findOne({DeptName:upperCaseDeptName})
    if(deptNameRegistered){
        res.status(409);
        throw new Error("Department already registered");
    }

    const deptEmailRegistered = await DepartmentSchema.findOne({DeptInchargeEmail:DeptInchargeEmail})
    if(deptEmailRegistered){
        res.status(409);
        throw new Error(`Email has alraedy been registered with department : ${deptEmailRegistered.DeptName}`);
    }
    checkValidEmail(DeptInchargeEmail,res);


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DeptInchargePassword , salt);
    console.log(hashedPassword)
    const dept = await DepartmentSchema.create({
        DeptName:upperCaseDeptName,
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








//admin register
const adminRegister=asyncHandler(async(req,res)=>
{
  
             const {email,password}=req.body;


    checkValidEmail(email,res);

    const RegisterAdmin = await AdminSchema.findOne({ email: email })
    if(RegisterAdmin !== null){
        res.status(409);
        throw new Error("User already exists!!!");
    }
    else{
             try{
                const new_admin=await AdminSchema.create({email,password});
                res.status(200).json(new_admin);
             }catch (err) {
                res.status(400).json({ err });
            }
    }
});


module.exports = { adminLogin,createDepartment,adminRegister}