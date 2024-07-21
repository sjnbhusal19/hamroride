'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";




const PublishRide = () => {

  let [passenger, setPassenger] = useState(1);

  if(passenger==0)
    {
     setPassenger(1)
    }

  return (
    <div className='flex flex-col items-center justify-between '>
    <div className='text-center bg-white  text-blue-600 m-2 p-2'>
         <div className='text-blue-600 text-center'>
          <h1 className='text-2xl'>Publish A Ride</h1>
         </div>
         <br/>
        
      <div className='flex justify-center  items-center' >

<div className="flex w-full gap-4">
<div className='m-4'>  <Input type="text" label="Leaving From"  isRequired/></div>
<div className='m-4'>  <Input type="text" label="Going To"  isRequired/></div>
<div className='m-4'> 
<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
<DatePicker
          label="Date and time"
          minValue={today(getLocalTimeZone())}
          defaultValue={today(getLocalTimeZone())}
          className='max-w-[284px]'
          isre
        />
</div>
</div>
<div className='m-4 text-black mt-6'> 
Passenger
<button className='m-2 bg-blue-400 h-8 w-8' onClick={()=>setPassenger(passenger-1)}>-</button>{passenger}<button className='m-2 bg-blue-400 h-8 w-8' onClick={()=>setPassenger(passenger+1)}>+</button>

</div>



<Button color="primary" className='mt-6 mr-4 h-12'>Publish</Button>
</div>

</div>

    </div>
    </div>
  )
}

export default PublishRide