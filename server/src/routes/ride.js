const { Router } = require('express'); 
const {publishRide} = require ('../contorllers/ride')




const router = Router(); 


router.post('/publishride', publishRide)
  
 // router.get('/user', findUser)
  
 
  module.exports =router