const mongoose = require('mongoose');
const { Schema } = mongoose;

const rideSchema = new Schema({
 
    leavingFrom:{
      type: String,
      required: true
    },
    goingTo:{
      type: String,
      required: true
    },
    date:{
      type: Object,
      required: true,
    },
    numberOfPassenger:{
      type: Number,
      required: true
    },
    bookedSheet:{
        type:Number,
        required:true
    },
    remainingSheet:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    }
  });

  const Ride = mongoose.model('Ride', rideSchema);

  module.exports = Ride