'use client'
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import Bottom from '@/component/about/page';
import { useSelector } from 'react-redux';



const adminHome = () => {
  const {userDetails} = useSelector (state => state.user)
  return (
     
    <div >
      <div className='p-1 mx-8 m-1  text-blue-800'>
      Hello, {userDetails.firstName} {userDetails.lastName}
      </div>

    <div >
      <Image 
       width={1600}
       height={1}
      alt="Pick A Ride"
      src="/body.png"
    />
      </div>
       <div className='bg-gray-600 '>
    <Bottom/>
    </div>
    </div>
    
  )
}

export default adminHome
