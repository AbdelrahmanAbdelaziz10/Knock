import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { ProductDetailsContext, ServesDetailsContext, ToggleContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { FaCircleExclamation } from 'react-icons/fa6'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import "../Checkout/mainCheckout/MainCheckOut.css";
import ChickMain from '../Checkout/ChickMain'

const CheckOut = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='book'>
    <NavBar/>   
    <ChickMain />
    <Footer />
    </div>
  )
}

export default CheckOut