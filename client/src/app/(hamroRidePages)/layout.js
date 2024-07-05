'use client'
import React from 'react'
import CustumNavbar from '@/component/navbar/page'


const layout = ({clildren}) => {
  return (
    <div>
        <CustumNavbar/>
        {clildren}
        </div>
  )
}

export default layout