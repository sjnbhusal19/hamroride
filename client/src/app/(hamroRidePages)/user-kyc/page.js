'use client'
import React,{ useState} from 'react';
import { useFormik } from 'formik';
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const UserKyc = () => {

  const userDetailsKyc= [
    {name:'firstName', label:'First Name'},
    {name:'lastName', label:'Last Name'},
    {name:'email', label:'Email'},
     {name:'address', label:'Address'}, 
     {name:'phoneNumber', label:'Phone  Number'},  
      {name:'gender', label:'Gender' , radioOption:['Male','Female','Other'], type:'radio'},
      {name:'role', label:'Role'},
         {name:'fatherName',label:'Father Name'},
          {name:'permanentAddress',label:'Permanent Address'},
         {name:'drivingLicenseNumber',label:'Driving License Number'},
          {name:'citizenshipNumber',label:'Citizenship Number'},
          {name:'vehicleNumber',label:'Vehicle Number'},

  ]

  const userKycSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2,'Too Short')
      .required('First Name is required.'),
   lastName: Yup.string()
      .min(2,'Too Short')
      .required('Last Name is required.'),    
   email: Yup.string()
      .email('Invalid email format')
      .required('Email is required.'),
   address: Yup.string()
      .min(2,'Too Short')
      .required('Address is required.'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits.')
      .required('Phone number is required.'),
    gender: Yup.string()
      .required('Gender must be select.'),    
    role: Yup.string()
      .required(' Register role must be select.'), 
    fatherName: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
    permanentAddress: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
      drivingLicenseNumber: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
      citizenshipNumber: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
      vehicleNumber: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
  });

 const {userDetails} = useSelector(state=>state.user)
 const {firstName,lastName,email,address, phoneNumber,gender,role,_id} = userDetails

  const formik = useFormik({
    initialValues: {
      firstName:firstName,
      lastName:lastName,
      email:email,
      address:address,
      phoneNumber:phoneNumber,
      gender: gender,
      role:role,
      fatherName: '',
      permanentAddress: '',
      drivingLicenseNumber:'',
      citizenshipNumber: '',
      vehicleNumber:''
    },
    validationSchema:userKycSchema,
    onSubmit: values => {
      submitUserKyc(values)
    },
  });

  const submitUserKyc = async(values) => {
   let formData = new FormData(); 
     for(let item in values){
       formData.append(item, values[item] ); 
     }
     formData.append('userId', _id);
     formData.append('citizenshipPhoto', image);
    const requestOptions = {
    method: 'POST',
    body: formData
  };
  const response = await fetch('http://localhost:4000/kyc', requestOptions);
  const data = await response.json()
  if(data.msg){
    toast(data.msg)
  }
  }

  const [image, setImage] = useState(null)
  return (
    <form className='flex justify-center items-center flex-col ' onSubmit={formik.handleSubmit}>
    <div className='w-[45%]  p-8 bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7'>
     <div className='text-blue-600 text-center text-4xl'>
      <h1>Fill Your KYC Form</h1>
    </div>
     {userDetailsKyc.map((item)=>{
      if(item.type ==='radio'){
        return (
          <div>
          <RadioGroup
          orientation="horizontal"
          defaultValue={formik.values.gender}
          label={item.label}
          name={item.name}
          type={item.type}
          onChange={formik.handleChange}
        >{
          item.radioOption.map((val)=>{
            return (
              <Radio value={val}>{val}</Radio>
            )
          })
        }
       
        </RadioGroup>
         {formik.touched[item.name] && formik.errors[item.name] ? (
          <div className="text-red-500 text-sm">{formik.errors[item.name]}</div>
        ) : null}
        </div>
        )
      }
      return (
        <div>
           <label htmlFor={item.name}>{item.label}</label>
      <Input
        id={item.name}
        variant="bordered"
        name={item.name}
        type="text"
        onChange={formik.handleChange}
        value={formik.values[item.name]}
      />
       {formik.touched[item.name] && formik.errors[item.name] ? (
        <div className="text-red-500 text-sm">{formik.errors[item.name]}</div>
        ) : null}
        </div>
      )
     })}

     <input  type="file" onChange={(e)=>setImage(e.target.files[0])}/> 
      

     <div className='flex item-center justify-center'>
      <Button className='bg-blue-600 text-white shadow-lg text-white text-center' type="submit">Submit</Button>
      </div></div>
    </form>
  );
};


export default UserKyc