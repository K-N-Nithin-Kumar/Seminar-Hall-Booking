const mongoose = require("mongoose")


const DeptSchema = new mongoose.Schema({
    Deptname: {
        type: String,
        required: true
    },
    DeptInchargeName:
    {
        type: String,
        required: true
    },
    DeptInchargeEmail: {
        type: String,
        required: true
    },
    DeptInchargePasswrd:
    {
        type: String,
        required: true
    }
})


const DeptModel=mongoose.model("dept_model",DeptSchema);

module.exports=DeptModel;