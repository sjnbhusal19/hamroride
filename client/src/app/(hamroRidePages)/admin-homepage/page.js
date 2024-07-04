'use client'
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import Bottom from '@/component/about/page';
import CustomNavbar from '@/component/navbar/page';



const adminHome = () => {

  return (
     
    <div >
      <CustomNavbar/>

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
