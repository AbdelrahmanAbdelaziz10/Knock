import React, { useEffect } from 'react'
import NavBar from '../Component/Common Component/NavBar/NavBar'
import Footer from '../Component/Common Component/Footer/Footer'
import MainProduct from '../Component/Allproduct Component/MainProduct/MainProduct'
import Head from '../Component/Common Component/Head/Head'
import head from '../images/head.jpg'
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next'
const AllProduct = ({getPage,contentProduct,setContentProduct}) => {
  const {t,i18n}=useTranslation()

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='all_product product_head'>
    <NavBar />
    <Head img={head} page={t("all_product_product")} title={t("home_category3")} />
    <MainProduct getPage={getPage} contentProduct={contentProduct} setContentProduct={setContentProduct} />
    <Footer />
    </div>
  )
}

export default AllProduct