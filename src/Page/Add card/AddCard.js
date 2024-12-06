import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import MainAddCard from './Main Addcard/MainAddCard'
import Footer from '../../Component/Common Component/Footer/Footer'

const AddCard = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='add_card'>
    <NavBar />
    <MainAddCard />
    <Footer />
    </div>
  )
}

export default AddCard