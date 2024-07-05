const User = require("../models/user");


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


  module.exports = {findUser, loginUser, registerUser}