import React from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import MainBook from '../Booking/Main Booking/BookingOne/MainBook'
import Footer from '../../Component/Common Component/Footer/Footer'
import { MainCheckOut } from './mainCheckout/MainCheckOut';

export const CheckOutpage = () => {
  return (
    <div className='book'>
    <NavBar />
    <MainCheckOut />
    <Footer />
    </div>
  )
}
