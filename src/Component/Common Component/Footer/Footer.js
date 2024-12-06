import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Footr.css";
import googleplay from "../../../images/googleplay.png";
import appstore from "../../../images/appstore.png";
import { useTranslation } from "react-i18next";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "../../../images/Logo.png";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import { ContextLang } from "../../../App";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { selectedLanguage } = useContext(ContextLang);
  const toggleLogin = JSON.parse(localStorage.getItem("toggleLogin"));
  const handelLogInPage = () => {
    Swal.fire({
      icon: "error",
      title: selectedLanguage === "ar" ? "عذرًا..." : "Oops...",
      text:
        selectedLanguage === "ar"
          ? "يجب أن يكون لديك حساب أولاً لاستخدام هذه الخدمة"
          : "You Must Have an Account First To Use This Service",
      confirmButtonText:
        selectedLanguage === "ar" ? "انتقل إلى تسجيل الدخول" : "Go to Login",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };
  return (
    <>
      <footer className="footer">
        <Container>
          <Row className="py-4 footer_links">
            <Col xs={12} lg={4} md={7} sm={12}>
              <div className="footer_img">
                <img src={Logo} alt="" />
              </div>
              <div className="footer_text">
                <p>{t("home_download_p")}</p>
              </div>
            </Col>
            <Col xs={12} lg={4} md={5} sm={12}>
              <div className="footer_list">
                <h5>{t("f-pages")}</h5>
                <ul className="f_list">
                  <li>
                    <Link className="list_link" to="/">
                      {t("home")}
                    </Link>
                  </li>
                  <li>
                    <Link className="list_link" to="/product">
                      {t("f-allProduct")}
                    </Link>
                  </li>
                  <li>
                    <Link className="list_link" to="/product_order">
                      {t("Booking_Product")}
                    </Link>
                  </li>
                  <li>
                    <Link className="list_link" to="/serves">
                      {t("f-allserves")}
                    </Link>
                  </li>
                  <li>
                    <Link className="list_link" to="/your-order">
                      {t("Booking")}
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} lg={4} md={8} sm={12}>
              <div className="footer_contact">
                <h5> {t("f_contact_h")} </h5>
                <p>
                  <span>
                    {" "}
                    <FaPhoneAlt />{" "}
                  </span>{" "}
                  +966 59 333 4444{" "}
                </p>
                <p>
                  {" "}
                  <span>
                    <FaLocationDot />{" "}
                  </span>{" "}
                  {t("Contact_address")}{" "}
                </p>
                {toggleLogin === true ? (
                  <button
                    className="btn btn_contact"
                    onClick={() => navigate("/contact")}
                  >
                    {" "}
                    {t("contact")}
                  </button>
                ) : (
                  <button className="btn btn_contact" onClick={handelLogInPage}>
                    {" "}
                    {t("contact")}
                  </button>
                )}
              </div>
            </Col>
          </Row>
          <div className="line row" />
          <div className="row justify-content-center align-item-center min_footer">
            <Col xs={12} lg={6} md={8} sm={12} className="">
              <p className="text-center">{t("f-End")}</p>
            </Col>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
