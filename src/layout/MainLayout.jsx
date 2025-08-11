<<<<<<< HEAD
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

=======
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default MainLayout