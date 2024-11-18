import React from 'react'
 
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
     <Header/>
     <div style={{minHeight:"80vh"}}>
        <Outlet/>
     </div>
      
      <Footer/>
      
    </>
  )
}

export default Layout