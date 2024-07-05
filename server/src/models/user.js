const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
 
    firstName:{
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    address:{
      type: String,
      required: true
    },
    password:String, // String is shorthand for {type: String}
    phoneNumber: {
      type: String,
      required: true
    },
    gender :{
      type: String,
      enum:['Male','Female','Others'],
    default:'male'
    },
    role:{type:String,
      enum: ['Rider','User'],
      default:'user'
    }
  });

  const User = mongoose.model('User', userSchema);

  module.exports = User