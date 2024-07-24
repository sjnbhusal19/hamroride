const Ride = require("../models/publishride");



 const publishRide = async(req, res) => {
    try {
       await Ride.create(req.body)
       res.json({msg: "Your ride is sucessfully published"})
    }catch(error){
      res.json({
        msg: "Please fill all details again and publish it."
      });
    }
  }

  

  module.exports = {publishRide}