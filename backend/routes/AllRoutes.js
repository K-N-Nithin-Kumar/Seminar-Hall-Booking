const express = require("express")
const router = express.Router();
const {createDepartment , loginAdmin } = require("../controllers/AllControllers");



//admin login routers
router.post("/loginadmin",loginAdmin);


//department creation
router.post("/createdept",createDepartment)

module.exports=router;