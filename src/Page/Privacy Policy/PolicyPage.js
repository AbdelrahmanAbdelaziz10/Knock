import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import "./policypage.css"
import MainPolicy from './Main Policy/MainPolicy'
const PolicyPage = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='policy_page'>
    <NavBar />
    <MainPolicy />
    <Footer />
    </div>
  )
}

export default PolicyPage