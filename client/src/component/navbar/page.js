'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { FaCircleUser,FaCircleArrowDown,FaLocationCrosshairs  } from "react-icons/fa6";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import HamroRideLogo from '../logo/page';
import Link from 'next/link';
import { RiHistoryFill } from "react-icons/ri";
import navBarItems from '@/config/navBarItems.json'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/redux/reducerSlices/userSlice';




const CustumNavbar = () => {
const {userDetails} = useSelector(state=>state.user)
const router = useRouter();
const dispatch = useDispatch();

const logout = () =>{
  dispatch(logoutUser())
  router.push('/')
}


const handleNavigation = (path) => {
  router.push(path)
}

  return (
     <div className=' flex items-center justify-between m-2'>
     <div >
     <HamroRideLogo/>
    </div>
    <div className='flex'>
    <div className='flex p-2 space-x-2'> 
    {
    navBarItems[userDetails?.role] && navBarItems[userDetails?.role].map((item) => {
      return(
     <div key={item.Link} className='text-blue-600 flex m-2 p-1 space-x-2' onClick={() => handleNavigation(item.Link)}>
    {(() => {
        if (item.name=='Search Ride') {
          return (
            <div className='flex'>
               <FaSearch className='text-xl mr-1 mt-1' />
               {item.name}
            </div>
          )
        } else if (item.name =='Ride History') {
          return (
            <div className='flex '>
              <RiHistoryFill className='text-xl mr-1 mt-1'/>
              {item.name}
            </div>
          )
        } else if (item.name == 'Present Location'){
          return (
            <div className='flex'>
            <FaLocationCrosshairs className='text-xl mr-1 mt-1' />  
            {item.name}
            </div>
          )
        } else if (item.name == 'Publish Ride'){
          return(
            <div className='flex '>
               <CgAdd className='text-xl mr-1 mt-1' />
               {item.name}
              </div>
          )
        }else if (item.name == 'Verify KYC'){
          return(
            <div className='flex'>
              <MdOutlineSystemSecurityUpdateGood className='text-xl mr-1 mt-1'/>
              {item.name}
            </div>
          )
        }else if (item.name == 'Remove Ride'){
          return(
            <div className='flex'>
            <CiCircleRemove className='text-xl mr-1 mt-1'/>
            {item.name}
            </div>
          )
          
        }
      })()}

      </div>
    )
  })
  }
   </div>

      <div className='text-blue-600 m-2 p-1'>
      <Dropdown>
      <DropdownTrigger>
        <Button className='text-blue-600 '>
         <div className='flex'>
        <div >  <FaCircleUser /></div>
         <div> <FaCircleArrowDown/></div>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
       <DropdownItem key="profile" className='text-blue-600' ><Link href="/profile"><div>Profile</div></Link></DropdownItem>
        <DropdownItem key="logout" className='text-blue-600' onClick={()=>logout()}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
      
      </div>
      </div>
      </div>
  )
}

export default CustumNavbar