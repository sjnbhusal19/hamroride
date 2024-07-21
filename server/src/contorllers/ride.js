const Ride = require("../models/publishride");



 const publishRide = async(req, res) => {
    try {
      const publish= await Ride.create(req.body);
    res.send(publish);
    }catch(error){
      res.send(error);
    }
  }

  

  module.exports = {publishRide}