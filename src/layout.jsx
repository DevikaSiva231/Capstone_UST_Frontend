import React from 'react';
import Navbar from './pages/navbar';
import Footer from './pages/footer';
import { Outlet } from 'react-router';

function Layout() {
  return (
      <>
    <div style={{backgroundColor:"black"}}>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    </>
  )
}

export default Layout