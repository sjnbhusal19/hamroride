const { Router } = require('express'); 
const {findUser, loginUser , registerUser,updateUserKyc,checkKycStatusByUserId,showUserKyc,showIndividualKyc,showIndividualKycr,showKyc} = require ('../contorllers/user')



const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'src/uploads/citizenship/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })


const router = Router(); 


router.post('/register', registerUser)
  
  router.get('/user', findUser)
  
  router.post('/login', loginUser )

  router.post('/kyc',upload.single('citizenshipPhoto'),  updateUserKyc)

  router.get('/kyc-status/:userId',checkKycStatusByUserId)

  router.get('/userkyc',showUserKyc)

  router.patch('/userkyc/:id',showIndividualKyc)

  router.patch('/userkycr/:id',showIndividualKycr)

  router.get('/userkyc/:userId',showKyc)
  
  module.exports =router