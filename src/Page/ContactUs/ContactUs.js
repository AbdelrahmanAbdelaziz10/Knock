import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import MainContact from './MainContact'

export const ContactUs = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='contact'>
    <NavBar />
    <MainContact />
    <Footer />
    </div>
  )
}
