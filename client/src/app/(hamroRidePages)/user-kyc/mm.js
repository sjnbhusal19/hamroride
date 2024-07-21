'use client'
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

// const  userInformation=[
//  {name:'firstName',label:'First Name'},
//   {name:'lastName',label:'Last Name'},
//   {name:'email',label:'Email'},
//   {name:'phoneNumber',label:'Phone Number'},
//  {name:'gender',label:'Gender', option:['Male','Female','Other'],type:'radio'},
//   {name:'role',label:'Role'},
//   {name:'fatherName',label:'Father Name'},
//  {name:'permanentAdress',label:'Permanent Address'},
//   {name:'drivingLicenseNumber',label:'Driving License Number'},
//  {name:'citizenshipNumber',label:'Citizenship Number'},
//  {name:'vehicleNumber',label:'Vehicle Number'},
// ]




// const kycSchema = Yup.object().shape({
//  firstName: Yup.string()
//     .min(2,'Too Short')
//     .required('First Name is required.'),
// lastName: Yup.string()
//     .min(2,'Too Short')
//     .required('Last Name is required.'),    
// email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required.'),
// presentAddress: Yup.string()
//     .min(2,'Too Short')
//     .required('Present Address is required.'),
// phoneNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits.')
//     .required('Phone number is required.'),
// gender: Yup.string()
//     .required('Gender must be select.'),    
// role: Yup.string()
//     .required(' Register role must be select.'), 
// fatherName: Yup.string()
//     .required ('Father Name is required'),
// permanentAdress: Yup.string()
//     .required ('Permanent Adress is required'),
// drivingLicenseNumber: Yup.number()
//     .required('Driving License Number is required'),
// citizenshipNumber : Yup.string()
//     .required('Citizenship Number is required'),
// vehicleNumber:Yup.string()
// .required('Vahicle Number is required')
//   });
  
    const KycInformation = () => {
     const {userDetails} = useSelector(state=>state.user)
     const {firstName,lastName,email,phoneNumber,gender,role,_id,presentAddress}=userDetails
 
    //  const formik = useFormik({
    //     initialValues: {
    //      firstName:firstName,  
    //     lastName: lastName,
    //     email:email,
    //     presentAddress:presentAddress,
    //     phoneNumber:phoneNumber,
    //     gender:gender,
    //     role:role,
    //     fatherName:'',
    //     permanentAdress:'',
    //     drivingLicenseNumber:'',
    //     citizenshipNumber:'',
    //     vehicleNumber:''
    //     },
    //     validationSchema:kycSchema,
    //     onSubmit: values => {
    //     submitUserKyc(values)
    //      }
    //   });

      // const submitUserKyc = async(values) =>{
      //   const requestOptions ={
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body : JSON.stringify(values)
      //   };
      //   const response = await fetch('http:localhost:4000/user-kyc',requestOptions);
      //   const data = await response.json()
       
      //   if(response.status == '201'){
      //     toast.success(data.msg)
      //   }else{
      //     toast.error(data.msg)
      //   }
      // }
     const [image, setImage] = useState(null)

    return (
      <div>
    {/* <Input type="firstName" variant="bordered" label="First Name" 
    id="firstName"
    name="firstName"
    onChange={formik.handleChange}
    value={formik.values.firstName} 
     />
     {formik.touched.firstName && formik.errors.firstName ? (
        <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        ) : null}
         <Button type="submit" radius="full" className="bg-blue-600 text-white shadow-lg">
      Sign Up
    </Button>
    </form> */}
         <form onSubmit={formik.handleSubmit}>
         <div className='flex justify-center items-center  '>
         <div className='w-[45%]  p-8 bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7	'>
         <div className='text-blue-600 text-center text-4xl'>
      <h1>Fill Your KYC Form</h1>
    </div>
        <div>
            {userInformation.map((item)=>{
                if(item.type ==='radio'){
                    return (
                      <RadioGroup
                      label={item.label}
                      name={item.name}
                      type={item.type}
                      value={formik.values[item.name]}
                      onChange={formik.handleChange}
                    >
                       
                        {
                      item.option.map((val)=>{
                        return (
                          <Radio value={val}>{val}</Radio>
                        )
                      })
                    }
                     {formik.touched[item.name] && formik.errors[item.name] ? (
                      <div className="text-red-500 text-sm">{formik.errors[item.name]}</div>
                         ) : null} 
                   
                    </RadioGroup>
                    )
                  }else
                return(
                    <div>
            <Input type={item.name} variant="bordered" label={item.label}
              id={item.name}
              name={item.name}
              onChange={formik.handleChange}
              value={formik.values[item.name]}
               />
            {formik.touched[item.name] && formik.errors[item.name] ? (
            <div className="text-red-500 text-sm">{formik.errors[item.name]}</div>
            ) : null}
                </div>
                )
              
            })}
      
      </div>
 <div className='flex flex-col'>
<div className='flex'>
<label htmlFor="citizenshipPhoto">Citizenship:</label>
<input 
  type="file" 
  id="citizenshipPhoto"
  onChange={(e) => setImage(e.target.files[0])}
/>
</div>
<div className='flex'>
<label htmlFor="drivingLicencePhoto">Driving Licence:</label>
<input 
  type="file" 
  id="drivingLicencePhoto"
  onChange={(e) => setImage(e.target.files[0])}
/>
</div>
</div> 
<div className='flex item-center justify-center'>
    <Button type='submit' radius="full" className="bg-blue-600 text-white shadow-lg text-white text-center">
      Submit
    </Button>
    </div>
      </div></div>
      </form>
      </div>
  )
}

export default KycInformation;