const express = require("express")
const router = express.Router();

const {adminLogin, createDepartment,adminRegister } = require("../controllers/AllControllers");

//creating a admin(no frontend needed)
router.post("/registeradmin",adminRegister)

//admin login routers
router.post("/loginadmin",adminLogin);


//department creation
router.post("/createdept",createDepartment)

module.exports=router;