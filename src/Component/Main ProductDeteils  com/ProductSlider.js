import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "./swiper.css";
import sunoil from "../../images/product1.svg";
const ProductSlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="SwiperSlide ">
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper_img">
        <img src={sunoil} alt="" />
        </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
