const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
    
  DepartmentName: {
    type: String,
    required:[true , "Please add the deppt name"],
  },
  EmployeeName:{
     type:String,
  },
  HallName: {
    type: String,
    required:[true , "Please add the hall name"],
  },
  Date: {
    type: Date,
    required:[true , "date?"],
  },
  startTime: {
    type: String,
    required:[true , "Starting time"],
  },
  endTime: {
    type: String,
    required:[true , "ending time"],
  },

});


const SeminarHallBooking = mongoose.model('SeminarHallBooking', BookingSchema);

module.exports = SeminarHallBooking;