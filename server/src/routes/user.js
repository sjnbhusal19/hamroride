const { Router } = require('express'); 
const {findUser, loginUser , registerUser} = require ('../contorllers/user')

const router = Router(); 


router.post('/register', registerUser)
  
  router.get('/user', findUser)
  
  router.post('/login', loginUser )

  module.exports =router