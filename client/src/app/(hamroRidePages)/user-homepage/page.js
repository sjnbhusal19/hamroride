'use client'
import React from 'react'
import {Image} from "@nextui-org/image";
import Bottom from '@/component/about/page';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';
import { setUserKycVerifiedStatus } from '@/redux/reducerSlices/userSlice';
import { useEffect } from "react";


const userHome = () => {
  const dispatch= useDispatch();
  const {userDetails, kycVerifiedStatus} = useSelector (state => state.user)
  useEffect(()=>{
    checkKycStatus()
  },[]);

const checkKycStatus = async ()=>{
  const {data}= await axios.get(`http://localhost:4000/kyc-status/${userDetails._id}`)
  dispatch(setUserKycVerifiedStatus(data.kycVerifiedStatus))
}
const generateKycDiv = ()=>{
  if(kycVerifiedStatus=== 'kyc-not-filled'){
     return <p> ⚠️ User KYC is not submitted. <Link href="/user-kyc">Submit Now</Link> </p>
  }else if(kycVerifiedStatus === 'pending'){
    return <p> User KYC is submitted. Please wait for Admin Approval </p>
  }else if(kycVerifiedStatus === 'rejected'){
    return <p> Your KYC was rejected. <Link href="/user-kyc">Re-submit Now</Link> </p>
  }
}
  return (
    <div>
    <div className='p-1 mx-8 m-1  text-blue-800 flex'>
      Hello, {userDetails.firstName} {userDetails.lastName}
      <div className='bg-blue-300 text-white px-1 mx-4 rounded'>
        {generateKycDiv()}
        </div>
      </div>
    <div >
      <Image 
       width={1600}
       height={1}
      alt="Pick A Ride"
      src="/body.png"
    />
      </div>
        <div className='flex m-4 items-center justify-center'>
          <div className='m-4'><h4>Your pick of rides at low prices</h4>
           <p className='text-gray-600 text-xs'>No matter where you’re going, by bus or<br/> 
           carpool, find the perfect ride from our wide<br/> 
           range of destinations and routes at low <br/>prices.</p>
           </div>
           <div className='ml-4 mr-4 mt-4'><h4>Trust who you travel with</h4>
           <p className='text-gray-600 text-xs'>We take the time to get to know each of our<br/> 
           members and bus partners. We check<br/> 
           reviews, profiles and IDs, so you know who <br/>you’re travelling with and can book your
           <br/>ride at ease on our secure platform.</p>
           </div>
           <div className='m-4'><h4>Scroll, click, tap and go!</h4>
           <p className='text-gray-600 text-xs'>Booking a ride has never been easier!<br/> 
           Thanks to our simple app powered by great<br/> 
           technology, you can book a ride close to<br/>you in just minutes.</p>
           </div>
        </div>
    
    <div className='bg-blue-600 flex items-center justify-center mb-4'>
    <div className='m-2 flex items-center justify-center '>
    <Image  className=' p-4 '
       width={400}
       
      alt="car Share"
      src="/carshare.jpg"
    />
    </div>
    <div>
    <div className='m-4'><h1>Your safety is our priority</h1>
           <p className='text-white text-sm'>At Hamro Ride, we're working hard to make our platform as secure as it<br/> 
           can be. But when scams do happen, we want you to know exactly how<br/> 
           to avoid and report them. Follow our tips to help us keep you safe.<br/></p>
           </div>
    </div>
    </div>

    <div className='flex m-4 items-center justify-center'>
          <div className='m-4'><h4>Drive when you want, make what you need</h4>
           <p className='text-gray-600 text-xs'>Make money on your schedule with deliveries or rides—or<br/> 
           both. You can use your own car or choose a rental<br/> 
           through Hamro Ride. <br/></p>
           </div>
           <div className='ml-4 mr-4 mt-4'><h4>Trust who you travel with</h4>
           <p className='text-gray-600 text-xs'>We take the time to get to know each of our<br/> 
           members and bus partners. We check<br/> 
           reviews, profiles and IDs, so you know who <br/>you’re travelling with and can book your
           <br/>ride at ease on our secure platform.</p>
           </div>
           <div className='m-4'><h4>Scroll, click, tap and go!</h4>
           <p className='text-gray-600 text-xs'>Booking a ride has never been easier!<br/> 
           Thanks to our simple app powered by great<br/> 
           technology, you can book a ride close to<br/>you in just minutes.</p>
           </div>
        </div>

       <div className='bg-gray-600 '>
    <Bottom/>
    </div>
    </div>
    
  )
}

export default userHome
