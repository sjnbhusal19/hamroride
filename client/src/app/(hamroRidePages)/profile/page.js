'use client'
import React from 'react'
import { useSelector } from 'react-redux'



const profile = () => {
  const {userDetails,kycVerifiedStatus} = useSelector(state => state.user)
  const {address,email,firstName,lastName,gender,phoneNumber,role}=userDetails
  return (
    <div className='flex flex-col items-center justify-between '>
     <div className='text-center bg-white shadow-lg rounded-xl text-blue-600 w-[75%] m-2 p-2'>
     <h1 className='text-4xl'>PROFILE</h1> 
    <div className=' text-left'>
    
    <h1 className='text-2xl'> {firstName} {lastName}</h1>
    <p>Email:{email}</p>
    <p> Phone Number: {phoneNumber}</p>
    <p>  Role: {role}</p>
    <p> Address: {address}</p>
    <p> Gender: {gender}</p>
    <p> KYC Verified Status: {kycVerifiedStatus}</p>
   
   
   
  
   
    </div>
    </div>
    </div>
  )
}

export default profile