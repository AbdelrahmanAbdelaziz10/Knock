import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Head.css'
const Head = ({img,page,title}) => {
  return (
    <div className='head_serves ' >
    <div className='black_hover'/>
    <div className='head_img' >
        <img src={img} alt=""/>
    </div>
    <div className='head_text  text-center'>
    <h2>{title}</h2>
    <Link to="/" className='home_icon'><FaHome /></Link> <span> <MdKeyboardArrowRight />  {page}</span>
    </div>
    </div>
  )
}

export default Head