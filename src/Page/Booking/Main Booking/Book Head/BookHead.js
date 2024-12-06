import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BookHead = ({stepnum,title}) => {
  return (
    <div className='main_book_head'>
    <Link to="/serves_details" className='arrow_back mb-3'> 
    <FaArrowLeft className='arrow_icon' /> 
    <span>Step {stepnum} of 3</span> </Link>
    <h6>{title}</h6>
    </div>
  )
}

export default BookHead