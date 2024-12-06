import React from 'react'
import './AboutSay.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import SwiperHome from './SwiperHome';
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';

const AboutSay = () => {
    const {t,i18n} = useTranslation()
  return (
    <section className="aboutsay py-5">
        <div className="container">
            <div className="row text-center mb-3">
                <h3>
                {t("home_say_title")}
                </h3>
                <p>
                {t("home_say_p")}
                </p>
            </div>
            <div className="row">
            <SwiperHome />
            </div>
        </div>
    </section>
  )
}

export default AboutSay