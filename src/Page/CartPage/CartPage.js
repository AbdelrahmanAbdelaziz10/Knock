import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import MainBook from '../Booking/Main Booking/BookingOne/MainBook'
import { MainCartCom } from './mainCartCom/MainCartCom'

const CartPage = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='cart_page'>
        <NavBar />
    <MainCartCom />
    <Footer />
    </div>
  )
}

export default CartPage