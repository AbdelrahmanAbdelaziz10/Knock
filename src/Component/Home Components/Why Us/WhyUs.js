import React from 'react'
import './WhyUs.css'
import star from '../../../images/star.svg'
import calendar from '../../../images/calendar (1).svg'
import topQuality from "../../../images/topquality.PNG";
import  goApp from "../../../images/gooapp.PNG"
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const WhyUs = () => {
    const {t,i18n} = useTranslation()

  return (
            <section className="Why-Us py-5">
        <div className="container">
            <div className="row title mb-4">
                <h4 className=" text-center">
                {t("home_whyus_title")}
                </h4>
                <p className="text-center">
                {t("home_whyus_p")}
                </p>
            </div>
            <div className="row ">
                <Col xs={6} lg={3} md={6} sm={6} className="">
                    <div className="card">
                        <div className="why-us-icon">
                            <img src={star} alt="star"/>
                        </div>
                        <div className="why-us-text">
                            <h5>
                                {t("home_whyus_title1")}
                            </h5>
                            <p>
                            {t("home_whyus_p1")}
                            </p>
                        </div>
                    </div>
                </Col>
                <Col xs={6} lg={3} md={6} sm={6} className="">
                    <div className="card">
                        <div className="why-us-icon">
                            <img src={calendar } alt=""/>
                        </div>
                        <div className="why-us-text">
                            <h5>
                            {t("home_whyus_title2")}
                            </h5>
                            <p>
                            {t("home_whyus_p2")}
                            </p>
                        </div>
                    </div>
                </Col>
                <Col xs={6} lg={3} md={6} sm={6} className="">
                    <div className="card">
                        <div className="why-us-icon">
                            <img className="mt-3" src={topQuality}alt=""/>
                        </div>
                        <div className="why-us-text">
                            <h5 className="pt-4">
                            {t("home_whyus_title3")}
                            </h5>
                            <p>
                            {t("home_whyus_p3")}
                                </p>
                        </div>
                    </div>
                </Col>
                <Col xs={6} lg={3} md={6} sm={6} className="">
                    <div className="card">
                        <div className="why-us-icon">
                            <img src={goApp} alt=""/>
                        </div>
                        <div className="why-us-text">
                            <h5 className="pt-4">
                            {t("home_whyus_title4")}
                            </h5>
                            <p>
                            {t("home_whyus_p4")}
                                </p>
                        </div>
                    </div>
                </Col>
            </div>
        </div>

    </section>
  )
}

export default WhyUs