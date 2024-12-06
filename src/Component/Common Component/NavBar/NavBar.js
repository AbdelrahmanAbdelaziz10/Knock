import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { CgProfile } from "react-icons/cg";
import { TiThMenu } from "react-icons/ti";
import Logo from "../../../images/Logo.png";
import { useTranslation } from "react-i18next";
import {
  ContextLang,
  NumberProductContext,
  ProductNumberContext,
  ToggleLoginContext,
} from "../../../App";
import googleplay from "../../../images/googleplay.png";
import appstore from "../../../images/appstore.png";
import { FaQuestionCircle } from "react-icons/fa";
import { Col } from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { TbGiftCard } from "react-icons/tb";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdOutlineSettings } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdPolicy } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { CartCountContext } from "../../../Context/CartCountContext";
import { MdMobileScreenShare } from "react-icons/md";

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  const { saveToggleLogin } = useContext(ToggleLoginContext);
  const toggleLogin = JSON.parse(localStorage.getItem("toggleLogin"));
  const { productNumber } = useContext(NumberProductContext);
  const [test, setTest] = useState(false);
  const [test2, setTest2] = useState(false);

  const { count, setCount } = useContext(CartCountContext);

  const togglleDrowpDown = () => {
    if (test === true) {
      setTest(false);
    } else {
      setTest(true);
      setTest2(false);
    }
  };
  const togglleSinAndLogin = () => {
    if (test2 === true) {
      setTest2(false);
    } else {
      setTest2(true);
      setTest(false);
    }
  };
  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };
  const clearLocalStorage = () => {
    saveToggleLogin(false);
    localStorage.removeItem("loginFormData");
    localStorage.removeItem("servesOrder");
    localStorage.removeItem("ProductOrder");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("toggle");
    // localStorage.removeItem("users");
  };
  // useEffect(()=>{

  // },[toggleLogin])
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="d-flex form" role="search">
            {/* <FaCartShopping className="buy_product"/>
          <div className="number" > {productNumber} </div> */}
            {toggleLogin === true ? (
              <Link to="/cart_shop">
                <FaCartShopping className="buy_product" />
                <div className="number"> {count} </div>
              </Link>
            ) : null}

            {selectedLanguage === "ar" ? (
              <button
                className="btn btn-lang"
                onClick={(e) => handleChangeLanguage("en")}
              >
                English
              </button>
            ) : (
              <button
                className="btn btn-lang"
                onClick={(e) => handleChangeLanguage("ar")}
              >
                العربية
              </button>
            )}

            <button
              className="btn btn-menu"
              type="button"
              onClick={() => togglleSinAndLogin()}
            >
              <TiThMenu className="fa-solid fa-bars mt-1" />
              <CgProfile className="fa-solid fa-user" />
            </button>
          </div>
        </div>
      </nav>
      {toggleLogin === true ? (
        <div
          className={
            test2 === true
              ? "display-block dropmenu login_deopmenu"
              : "dropmenu"
          }
          id="country"
        >
          <Link to="/profile" className="row row_hover border pt-2 mb-3">
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <IoPersonCircleSharp />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("profile")}</p>
            </Col>
          </Link>
          <Link to="/credits" className="row row_hover border pt-2 mb-3">
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <FaCreditCard />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("Payment_Methods")}</p>
            </Col>
          </Link>
          {/* 
          <Link to="/your-order" className="row row_hover border pt-2 mb-3">
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <FaCalendarAlt />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("Booking")}</p>
            </Col>
          </Link>
          <Link to="/product_order" className="row row_hover border pt-2 mb-3">
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <FaCalendarAlt />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("Booking_Product")}</p>
            </Col>
          </Link> */}
          <Link to="/screen" className="row row_hover border pt-2 mb-3">
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              {" "}
              <div className="login_flag">
                <MdMobileScreenShare />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("screen")}</p>
            </Col>
          </Link>
          <Link to="/contact" className="row row_hover border pt-2 mb-3">
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <LiaHandsHelpingSolid />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("Get_Help")}</p>
            </Col>
          </Link>
          <Link to="/privacy_policy" className="row row_hover border pt-2 mb-3">
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <MdPolicy />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("Policy_title")}</p>
            </Col>
          </Link>
          <Link
            to="/terms_conditions"
            className="row row_hover border pt-2 mb-3"
          >
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <MdPolicy />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p> {t("Terms_title")}</p>
            </Col>
          </Link>
          <a
            href="/"
            className="row row_hover border pt-2 mb-3 log_out_div"
            onClick={clearLocalStorage}
          >
            <Col xs={2} lg={1} md={3} sm={2} className="col-lg-2">
              <div className="login_flag">
                <RiLogoutCircleRLine className="log_out" />
              </div>
            </Col>
            <Col
              xs={10}
              lg={10}
              md={9}
              sm={10}
              className="col-lg-10 country_name"
            >
              <p className="log_out"> {t("Log_Out")}</p>
            </Col>
          </a>
        </div>
      ) : (
        <div
          className={test2 === true ? "display-block dropmenu" : "dropmenu"}
          id="signup"
        >
          <div className="row  pt-2 mb-3">
            <Link to="/login" className="btn btn-login">
              {t("login")}
            </Link>
          </div>
          <div className="row  pt-2 mb-3">
            <Link to="/singup" className="btn btn-login">
              {t("singup")}
            </Link>
          </div>

          <div className="row border_top pt-2 mb-3">
            <Col xs={6} lg={6} md={6} sm={6} className="col-lg-6">
              <img src={appstore} alt="App Store" />
            </Col>
            <Col xs={6} lg={6} md={6} sm={6} className="col-lg-6">
              <img src={googleplay} alt="Google Play" />
            </Col>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
