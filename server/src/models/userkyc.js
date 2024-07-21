const mongoose = require('mongoose');
const { Schema } = mongoose;

const userKycSchema = new Schema({
 
    isKycVerified:{
      type: Boolean,
      default:false
    },
    fatherName:{
      type:String,
      required:true
    },
    permanentAddress:{
      type:String,
      required:true
    },
    drivingLicenseNumber:{
      type:String,
      required:true
    },
    citizenshipNumber:{
      type:String,
      required:true
    },
    vehicleNumber:{
      type:String,
      required:true
    },
  citizenshipPhoto:String,
    //drivingLicensePhoto:String,
    kycVerifiedStatus: {
        type: String,
        enum : ['kyc-not-filled','pending','verified'],
        default: 'kyc-not-filled'
      },
      userId: String
    },
    {
      timestamps:true
  });

  const UserKyc = mongoose.model('UserKyc', userKycSchema);

  module.exports = UserKyc