import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

function Layout() {
  return (
    <div className='bg-slate-900 text-white'>
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout