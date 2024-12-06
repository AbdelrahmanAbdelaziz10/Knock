import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import "./AboutSay.css";
import profile from "../../../images/profile-pc.webp";
import { useTranslation } from "react-i18next";
// import image
import profile1 from "../../../images/person(1).jpeg";
import profile2 from "../../../images/person(2).jpeg";
import profile3 from "../../../images/person(3).avif";
import profile4 from "../../../images/person(4).jpg";

const SwiperHome = () => {
  const { t, i18n } = useTranslation();

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      loopAddBlankSlides={true}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="person">
          <div className="person_img">
            <img src={profile1} alt="" />
          </div>
          <span>{t("home_say_username")} </span>
        </div>
        <p>{t("home_say_p2")}</p>
      </SwiperSlide>

      <SwiperSlide>
        <div className="person">
          <div className="person_img">
            <img src={profile2} alt="" />
          </div>
          <span>{t("home_say_username")} </span>
        </div>
        <p>{t("home_say_p2")}</p>
      </SwiperSlide>

      <SwiperSlide>
        <div className="person">
          <div className="person_img">
            <img src={profile3} alt="" />
          </div>
          <span>{t("home_say_username")} </span>
        </div>
        <p>{t("home_say_p2")}</p>
      </SwiperSlide>

      <SwiperSlide>
        <div className="person">
          <div className="person_img">
            <img src={profile4} alt="" />
          </div>
          <span>{t("home_say_username")} </span>
        </div>
        <p>{t("home_say_p2")}</p>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperHome;
