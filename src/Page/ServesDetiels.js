import React, { useEffect, useState } from 'react'
import NavBar from '../Component/Common Component/NavBar/NavBar'
import Footer from '../Component/Common Component/Footer/Footer'
import MainProductDetails from '../Component/Main ProductDeteils  com/MainProductDeteils'
import MainServiesDetails from '../Component/MainServiesd com/MainServiesDetails'
import Location from './Location/Location'

export const ServesDetiels = () => {
  const [test, setTest] = useState(true);

  const changeTest = () => {
    setTest(false);
    window.scrollTo(0,0)

  };
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <>
          {test === false ? <Location test={test} setTest={setTest} /> : null}
   <div className= {test === false ? (" product_details_false display_none") : ('product_details')} >
    <NavBar />
    <MainServiesDetails changeTest={changeTest} />
    <Footer />
    </div>
    </>
  
     )
}
