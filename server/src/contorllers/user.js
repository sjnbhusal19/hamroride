const User = require("../models/user");
const UserKyc = require("../models/userkyc");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;


  const registerUser = async(req, res) => {
    try {
      const hashPassword = await bcrypt.hash(req.body.password,saltRounds)
      req.body.password=hashPassword;
      const phoneExist = await User.exists({phoneNumber:req.body.phoneNumber})
      const emailExist = await User.exists({email:req.body.email})
      
      if (phoneExist) {
        return res.status(409).json({msg :"Phone Number is already used"})
      }else if (emailExist){
        return res.status(409).json({msg:"Email is already used."})
      }
      await User.create(req.body)
      return res.status(201).json({msg: "Your account is sucessfully created."})
    }catch (error){
      res.status(400).send(error)}
  }


const loginUser = async (req,res) =>{
    const user=await User.findOne({email:req.body.email})
    if (user){
      const isMatched= await bcrypt.compare(req.body.password,user.password);
      if (isMatched){
        const token = await jwt.sign({ email: req.body.email},process.env.SECRET_KEY);
        res.json({msg:"Sucessfully Login to HamroRide",token,user})
      }else{
        res.status(401).json({msg:"Invlide password."})
      }
    }else{
      res.status(401).json({msg:"Email is not registred."})
    }
  }


 const findUser = async(req, res) => {
    try {
      const registerData= await User.find();
    res.send(registerData);
    }catch(error){
      res.send(error);
    }
  }

  const updateUserKyc = async (req,res)=>{
    try {
      req.body.citizenshipPhoto = req.file.filename
      req.body.kycVerifiedStatus = 'pending'
      await UserKyc.create(req.body)
      res.json({
        msg: "KYC submitted! Please wait for verification!"
      })
    } catch (error){
        res.status(400).send(error)}
  }


  const checkKycStatusByUserId = async (req,res)=>{
    try{
      const kycDetails= await UserKyc.findOne({userId:req.params.userId})
      if (!kycDetails){
        return res.json({
          kycVerifiedStatus : 'kyc-not-filled'
        })
      }
      return res.json({
        kycVerifiedStatus: kycDetails.kycVerifiedStatus
      })
      }catch(error){
      res.status(400).send(error)
    }
  }

  const showUserKyc = async (req,res)=>{
    try {
     const userKycList = await UserKyc.find();
     res.send(
      userKycList
    )
    }catch(error){
      res.status(400).send(error)
    }
  }

  const showIndividualKyc = async (req,res)=>{
    const {id}=req.params;
   // console.log(id)
    try{
      const kycIndividual= await UserKyc.findByIdAndUpdate(id,{kycVerifiedStatus:"verified"})
      res.send(
       kycIndividual
     )
      }catch(error){
      res.status(400).send(error)
    }
  }

  const showIndividualKycr = async (req,res)=>{
    const {id}=req.params;
   // console.log(id)
    try{
      const kycReject= await UserKyc.findByIdAndUpdate(id,{kycVerifiedStatus:"rejected"})
      res.send(
       kycReject
     )
      }catch(error){
      res.status(400).send(error)
    }
  }

  const showKyc = async (req,res)=>{
    try {
     const userKycList = await UserKyc.findById({_id:req.params.userId});
     res.send(
      userKycList
    )
    }catch(error){
      res.status(400).send(error)
    }
  }


  module.exports = {findUser, loginUser, registerUser,updateUserKyc,checkKycStatusByUserId,showUserKyc,showIndividualKyc,showIndividualKycr,showKyc}