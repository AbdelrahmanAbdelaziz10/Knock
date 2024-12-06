import React, { useState } from 'react'
import "../BookingOne/MainBook.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import BookHead from "../Book Head/BookHead";
import serves from "../../../../images/Rectangle 195.png";
import { Link } from "react-router-dom";
import { ServesCard } from '../BookingOne/ServesCard';
import NavBar from '../../../../Component/Common Component/NavBar/NavBar';
import Footer from '../../../../Component/Common Component/Footer/Footer';
import DateTime from './DateTime';
import PhoneNumber from '../../../phonenumber/PhoneNumber';

const MainBook2 = () => {
  const [test,setTest]=useState(true)
  // console.log("the value of test is ", test)

  const ChangeTest=()=>{
    setTest(false)
    // console.log("the value of test is ", test)
  }
  return (
    <>
              {test===false?( <PhoneNumber test={test} setTest={setTest} />):(null)}
    <div className={test===false?('main_step_2 display_none'):("")}>
          <NavBar />
          <div className="main_book py-lg-3 py-md-2 pb-5">
      <Container className='booking_container'>
        <Row className="booking_row_main">
          <BookHead stepnum={2} title={"Date & Time"} />
          <Col xs={12} lg={7} md={8} sm={12} className="border main_col  py-3">
            <div className="serves_col date-and-time">
            <DateTime />

            </div>
            <div className="row">
              <Link to="/booking_step2" className="btn btn_next" onClick={()=>setTest(false)}>Next</Link>
            </div>
          </Col>
          <Col xs={12} lg={5} md={4} sm={12} className="row ">
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
                <p className="col-lg-7">
                Handyman & Maintenance
                </p>
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
            <Col xs={12} lg={12} md={12} sm={12} className="border booking_details total">
            <h4>Payment Summary</h4>
              <div className="row">
              <Col xs={7} lg={8} md={6} sm={7}>
              <h6 className=" ">Total:</h6>
              </Col>
              <Col xs={5} lg={4} md={6} sm={5}>
                <p className="">
                AED 165.00
                </p>
                </Col>
                </div>
            </Col>
          </Col>
        </Row>
      </Container>

    </div>
          <Footer />
</div>
    </>

  );
};

export default MainBook2

