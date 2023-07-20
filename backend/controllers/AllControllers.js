const mongoose=require("mongoose")
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")
const AdminSchema = require("../models/Admin");
const DepartmentSchema = require("../models/Department")
const BookingSchema=require("../models/Booking")

//admin login function
const Adminlogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log(email,password)

    if (!email || !password) {
        res.json({ error: "Please Provide Valid Credentials" });
    }
//HI
//Prashanth
     // Email validation using regular expression
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
         res.status(400);
         throw new Error("Invalid email format.");
     }
//ends email validatipn


    const adminLogin = await AdminSchema.findOne({ email: email })
    
    console.log(adminLogin)
    
 
    if (adminLogin === null || adminLogin.password !== password) {
        res.json({ error: "Please Provide Valid admin credentials" })
    } else {
        res.json({ message: "Succesfully Logged In" })
    }
});


/*
  Code wriiten by Keshav(YOU)

  "READ THIS:Instead of try catch we can directly use the express-async-handler package to handle asyncronus events
  Reference I sent in group read"

  const createDepartment = async (req, res) => {
    const { Deptname, DeptInchargeName, DeptInchargeEmail, DeptInchargePasswrd } = req.body;

    try {
        const new_department = await DepartmentSchema.create({ Deptname, DeptInchargeName, DeptInchargeEmail, DeptInchargePasswrd });
        res.status(200).json(new_department);s
    } catch (err) {
        res.status(400).json({ err });
    }


   


}
*/

//Department Creation function
const createDepartment = asyncHandler(async(req,res)=>{
    const { Deptname, DeptInchargeName, DeptInchargeEmail, DeptInchargePasswrd } = req.body;
    // "ISSUE"
    // Deptname is not getting from the request 
    // path error
    //below log printing undefined resolve this 
    //hashing is done
    //validatioin is done
    console.log(Deptname);
    if (!Deptname || !DeptInchargeName || !DeptInchargeEmail || !DeptInchargePasswrd){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

     // Email validation using regular expression
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(DeptInchargeEmail)) {
         res.status(400);
         throw new Error("Invalid email format for department in-charge.");
     }
     //Email validation ends


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DeptInchargePasswrd , salt);
    console.log(hashedPassword)
    const dept = await DepartmentSchema.create({
        Deptname,
        DeptInchargeName,
        DeptInchargeEmail,
        DeptInchargePasswrd:hashedPassword
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
const Adminregister=async(req,res)=>
{
  
             const {email,password}=req.body;

              // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error("Invalid email format.");
    }
    //ends email validation

             try{
                const new_admin=await AdminSchema.create({email,password});
                res.status(200).json(new_admin);
             }catch (err) {
                res.status(400).json({ err });
            }
             
}


module.exports = { Adminlogin,createDepartment,Adminregister}