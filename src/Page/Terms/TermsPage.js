import React, { useEffect } from 'react'
import NavBar from '../../Component/Common Component/NavBar/NavBar'
import Footer from '../../Component/Common Component/Footer/Footer'
import MainTerms from './MainTerms'

const TermsPage = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
  return (
    <div className='policy_page'>
    <NavBar />
    <MainTerms />
    <Footer />
    </div>
  )
}

export default TermsPage