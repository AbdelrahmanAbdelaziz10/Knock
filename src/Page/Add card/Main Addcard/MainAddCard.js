import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaRegCreditCard } from 'react-icons/fa'
import { FaCircleExclamation } from 'react-icons/fa6'
import { SiVisa } from 'react-icons/si'
import { Link } from 'react-router-dom'
import '../Main Addcard/mainaddcard.css'
import BookHead from '../../Booking/Main Booking/Book Head/BookHead'
import pay from "../../../images/Group 156.png"
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next'
const MainAddCard = () => {
  const {t,i18n} =useTranslation()
  return (
    <div className="main_book py-lg-3 py-md-2 pb-5">
      <Container className=" booking_container">
        <Row className="booking_row_main  justify-content-center">
          <Col
            xs={12}
            lg={7}
            md={9}
            sm={12}
            className="border main_col py-3 ps-lg-4"
          >
            <div className="">
              <div className="payment ">
                <h3 className='text-center'>
                {t("add_card_title")}
                </h3>
                <div className="create_pay mb-4">
                  <Row className="row">
                    <Col xs={10} lg={10} md={8} sm={10}>
                      <h6 className="credit">
                        <FaRegCreditCard className="create" />
                        <span>
                        {t("add_card_visa")}
                        </span>
                      </h6>
                    </Col>

                    <Col xs={2} lg={2} md={4} sm={2} className=''>
                      <SiVisa className="visa" />

                    </Col>
                  </Row>
                </div>

                <Row className="px-lg-4">
                  <Col xs={12} md={12} lg={12} sm={12} className="mb-4">
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={t("add_card_placeholder_card")}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={6} sm={12} className="mb-4">
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={t("add_card_placeholder_date")}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={6} sm={12} className="mb-4">
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={t("add_card_placeholder_cvv")}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="nots mb-4">
                    <FaCircleExclamation className="icon" />
                    <p>
                    {t("add_card_massage")}
                    </p>
                    <span className=" btn-details">
                      {t("all_product_product_btn")}
                    </span>
                  </div>
                </Row>

              </div>
            </div>
            <div className="row">
              <Link to="/credit_card" className="btn btn_next">
                {t("personal_btn")}
              </Link>
            </div>
          </Col>
          {/* <Col xs={12} lg={5} md={4} sm={12} className="row ">
            <Col
              xs={12}
              lg={12}
              md={12}
              sm={12}
              className="border booking_details"
            >
              <h4>Booking Details</h4>
              <div className="row">
                <h6 className="col-lg-5 col-md-12">Address:</h6>
                <p className="col-lg-7 col-md-12">
                  73 Financial Center Rd - Downtown Dubai - Dubai - United Arab
                  Emir
                </p>
              </div>
              <div className="row">
                <h6 className="col-lg-5">Serves:</h6>
                <p className="col-lg-7">Handyman & Maintenance</p>
              </div>
              <div className="row">
                <h6 className="col-lg-5">Serves Details:</h6>
                <div className="col-lg-7 d-block">
                  <p className="serves_name">1x Handyman Book Hourly</p>
                  <p className="serves_name">1x Handyman Book Hourly</p>
                  <p className="serves_name">1x Handyman Book Hourly</p>
                  <p className="serves_name">1x Handyman Book Hourly</p>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              lg={12}
              md={12}
              sm={12}
              className="border booking_details total"
            >
              <h4>Payment Summary</h4>
              <div className="row">
                <Col xs={7} lg={7} md={5} sm={7}>
                  <h6 className=" ">Total:</h6>
                </Col>
                <Col xs={5} lg={5} md={7} sm={5}>
                  <p className="">AED 165.00</p>
                </Col>
              </div>
            </Col>
          </Col> */}
        </Row>
      </Container>
    </div>  
    )
}

export default MainAddCard