import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./swiperheader.css";
import useFetch from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import { ContextLang } from "../../../App";

export const SwiperHeader = () => {
  const { data: slider } = useFetch("/api/v1/sliders");
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  // console.log(slider);
  return (
    <div className="header_swiper">
      {slider && (
        <Swiper
          watchSlidesProgress={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          className="mySwiper"
        >
          {slider.data.map((slide, idx) => (
            <SwiperSlide key={slide.id}>
              <div className="slide_img">
                <img
                  src={`https://dashboard.knock-knock.ae/${slide.slider}`}
                  alt=""
                />
              </div>
              <div className="slide_title">
                {selectedLanguage === "en" ? (
                  <h1>{slide.title_en}</h1>
                ) : (
                  <h1>{slide.title_ar}</h1>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
