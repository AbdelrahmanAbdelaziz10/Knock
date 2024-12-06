import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import MainScreen from './MainScreen'

const ScreenPage = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
  return (
    <div>
    <NavBar />
    <MainScreen />
    <Footer />
    </div>
  )
}

export default ScreenPage