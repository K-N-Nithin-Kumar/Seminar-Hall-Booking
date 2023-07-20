const express = require("express")
const router = express.Router();

const {Adminlogin, createDepartment,Adminregister } = require("../controllers/AllControllers");

//creating a admin(no frontend needed)
router.post("/registeradmin",Adminregister)

//admin login routers
router.post("/loginadmin",Adminlogin);


//department creation
router.post("/createdept",createDepartment)

module.exports=router;