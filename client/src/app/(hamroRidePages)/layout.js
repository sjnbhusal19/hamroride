'use client'
import React from 'react'
import CustumNavbar from '@/component/navbar/page'


const Layout = ({children}) => {
  return (
    <div>
        <CustumNavbar/>
        {children}
        </div>
  )
}

export default Layout