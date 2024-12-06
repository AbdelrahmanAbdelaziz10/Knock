import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BookHead from '../../Booking/Main Booking/Book Head/BookHead'
import { FaArrowLeft, FaArrowRight, FaRegCreditCard } from 'react-icons/fa'
import { SiVisa } from 'react-icons/si'
import { FaCircleExclamation } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import greenVisa from "../../../images/visagreen.png"
import redVisa from "../../../images/visared.png"
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next'
import { ContextLang } from '../../../App'

const MainCreditCard = () => {
  const {t}=useTranslation()
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);

  return (
    <div className="main_book main_card py-lg-3 py-md-2 pb-5">
      <Container className=" booking_container">
        <Row className="booking_row_main  justify-content-center">
          <Col
            xs={12}
            lg={7}
            md={10}
            sm={12}
            className="border main_col py-3 ps-lg-4"
          >
            <div className="">
              <div className="payment ">
              <div className="row d-flex">
                <Col xs={1} lg={1} md={1} sm={1}>
                  <Link to="/checkout">
                    {selectedLanguage === "ar" ? (
                      <FaArrowRight className=" arrow_icon arrow_icon_ar" />
                    ) : (
                      <FaArrowLeft className="arrow_icon arrow_icon_en" />
                    )}
                  </Link>
                </Col>
                <Col xs={10} lg={10} md={10} sm={10} className="">
                  <h3 className="text-center">{t("paid_Way")}</h3>
                </Col>
              </div>
              

                <Row className=" justify-content-center mt-2">
                  <Col xs={10} md={8} lg={7} sm={10} className="mb-5">
                  <button className='btn visa_img'>
                  {t("cash")}
                  {/* <img src={greenVisa} alt='' /> */}
                  </button>
                  </Col>

                  <Col xs={10} md={8} lg={7} sm={10} className="mb-5">
                  <button className='btn visa_img'>
                  {t("credit_title")}
                  {/* <img src={redVisa} alt='' /> */}
                  </button>
                  </Col>

                </Row>

              </div>
            </div>
            {/* <div className="row">
              <Link to="/add_card" className="btn btn_next">
              {t("add_card_title")}
              </Link>
            </div> */}
          </Col>
         
        </Row>
      </Container>
    </div> 
    )
}

export default MainCreditCard