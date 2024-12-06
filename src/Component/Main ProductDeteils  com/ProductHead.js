import React, { useContext } from 'react'
import './MainProductDetails.css'
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ContextLang } from '../../App';
const ProductHead = ({img,page1,page2_en,page2_ar}) => {
  const { selectedLanguage } = useContext(ContextLang);

  return (
<div className='row product_head mb-lg-4 justify-content-center'>
<div className='head_title'>
<Link to="/" className=''>
<FaHome className='home_icon'/>
</Link> 
<Link to="" className='page1'> 
<MdKeyboardArrowRight className='home_icon'/>  {page1}
</Link> 
{selectedLanguage==="en"?(<span> <MdKeyboardArrowRight className='home_icon'/>  {page2_en}</span>):
(<span> <MdKeyboardArrowRight className='home_icon'/>  {page2_ar}</span>)}



</div>
<div className='head_image'>
    <img src={img} alt=''/>
</div>
</div>
    
  )
}

export default ProductHead