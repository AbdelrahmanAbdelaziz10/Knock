import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import MainBook from './Main Booking/BookingOne/MainBook'

const BookPage = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='book'>
    <NavBar />
    <MainBook />
    <Footer />
    </div>
  )
}

export default BookPage