'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from "react-redux";

const singledetails = ({params}) => {
  const {userDetails} = useSelector(state=>state.user)
  const {firstName,lastName,role,_id,email} = userDetails

  const [singleKyc,setSingleKyc] = useState({})
  const [isInvisible, setIsInvisible] = useState(false);

  const showSingleKyc = async()=>{
    const {data} = await axios.get(`http://localhost:4000/${params.id}`)
    setSingleKyc(data)
   }
   
    useEffect(() => {
      if(params.id){
       showSingleKyc()
      }
   }, []);
    

  return (
    <div>
      singledetails
<p>{userDetails.firstName}</p>
<p>{userDetails.email}</p>
    </div>
  )
}

export default singledetails