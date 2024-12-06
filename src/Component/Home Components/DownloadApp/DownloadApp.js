import React from 'react'
import './DownloadApp.css'
import { Link } from 'react-router-dom';
import downloadimg from '../../../images/downloading.png';
import googleplay from '../../../images/googleplay.png';
import appstore from '../../../images/appstore.png';
import { Col } from 'react-bootstrap';
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';

const Downloadapp = () => {
    const {t,i18n}= useTranslation()
  return (
    <>
            <section className="download mb-3">
        <div className="container ">
            <div className="row ">
                <Col xs={12} lg={7} md={8} sm={12} className="col-lg-7 col-md-8 mt-lg-5 ">
                    <div className="text">
                        {/* <span>
                             {t("home_download_span")}  
                        </span> */}
                        <h2>
                        {t("home_download_head")}  
                        </h2>
                        <p>
                        {t("home_download_p")}  
                        </p>
                    </div>
                    <div className=" row img_download">
                        <Col xs={6} lg={6} md={6} sm={6} className=" download_img">
                            <span >
                                <img src={googleplay} alt="google play"/>
                            </span>
                        </Col>
                        <Col xs={6} lg={6} md={6} sm={6} className=" download_img">
                            <span >
                                <img src={appstore} alt="App Store"/>
                            </span>
                        </Col>
                    </div>
                </Col>
                <Col xs={12} lg={5} md={4} sm={12}  className="col-lg-5 col-md-4">
                    <div className="mobile_pic pt-5">
                        <img src={downloadimg} alt="mobile_img"/>
                    </div>
                </Col>
            </div>

        </div>
    </section>
    </>
  )
}

export default Downloadapp