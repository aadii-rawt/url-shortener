import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function Layout() {
  return (
    <div className='bg-slate-900 text-white'>
        <Header />
        <Outlet />
        {/* <Footer /> */}
    </div>
  )
}

export default Layout