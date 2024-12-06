import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import "./buycredit.css"
import MainBuyCreadit from './mainbuy credit/MainBuyCredit'
const BuyCreditPage = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <div className='buy_credit'>
      <NavBar />
      <MainBuyCreadit />
      <Footer />
    </div>
  )
}

export default BuyCreditPage