import React, { useContext, useEffect, useState } from "react";
import "../credit.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ContextLang, LoginFormDataContext } from "../../../App";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import bocket from "../../../images/bocket.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { TbGiftCard } from "react-icons/tb";
import { IoWalletSharp } from "react-icons/io5";
import axios from "axios";
import { FaCoins } from "react-icons/fa";

export const MainCredit = () => {
  const { t } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  const loginForm = JSON.parse(localStorage.getItem("loginFormData"));
  const [balance, sertBalance] = useState();
  // const [handlingMassage,sertHandlingMassage]=useState("")
  const { loginFormData, saveLoginFormData } = useContext(LoginFormDataContext);
  const loginFormDatalocal = JSON.parse(localStorage.getItem("loginFormData"));
  const userWallet = parseFloat((loginFormDatalocal?.Wallet || 0).toFixed(2));

  const getBalance = async () => {
    try {
      /*      const response = await axios.post(
        "https://dashboard.knock-knock.ae/api/v1/packages/my-balance",
        { user_id: loginForm.id } // Wrap user_id in an object
      ); */
      // Handle the response data as needed
      // console.log(response.data);
      // console.log(balance.balance)
    } catch (error) {
      // console.error("Error getting balance", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="main_address main_credit py-4 mb-3">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} lg={6} md={10} sm={11} className="">
            <Card className="address_card">
              <div className="row d-flex credit_transition">
                <Col xs={1} lg={1} md={1} sm={1}>
                  <Link to="/">
                    {selectedLanguage === "ar" ? (
                      <FaArrowRight className=" arrow_icon arrow_icon_ar" />
                    ) : (
                      <FaArrowLeft className="arrow_icon arrow_icon_en" />
                    )}
                  </Link>
                </Col>
                <Col xs={10} lg={9} md={10} sm={10} className="">
                  <h4 className="text-center">{t("credit_available")} </h4>
                </Col>

                <div className="row justify-content-start px-md-5">
                  <Col xs={9} lg={9} md={8} sm={9} className="total_credit ">
                    <h5>{t("credit_h")}</h5>
                    <p>
                      {t("price")} {loginFormDatalocal.discount}%
                    </p>
                    {/* {selectedLanguage === "en" ? (
                      <Link to="" className="Link">
                        {t("credit_trans")}
                        <IoIosArrowForward className="transaction_arrow" />
                      </Link>
                    ) : (
                      <Link to="" className="Link">
                        {t("credit_trans")}
                        <IoIosArrowBack className="transaction_arrow" />
                      </Link>
                    )} */}
                  </Col>
                  <Col xs={3} lg={3} md={4} sm={3} className="credit_img">
                    <img src={bocket} alt="" />
                  </Col>
                </div>
              </div>
              <Row className="justify-content-center">
                <Col
                  xs={10}
                  lg={9}
                  md={10}
                  sm={10}
                  className=" text-center buy_credit card"
                >
                  <p>{t("credit_buy_p")}</p>
                  <Link to="/buy-credit" className="btn btn_credit">
                    {t("credit_buy")}
                  </Link>
                </Col>
              </Row>

              <Row className="justify-content-center ">
                {/* <Col xs={10} lg={9} md={10} sm={10} className=" send_gift">
                  <Link to="/send_gift" className="d-flex">
                    <TbGiftCard className="gift_credit" />
                    <p>{t("gift_title")}</p>
                  </Link>
                </Col> */}

                <Col xs={10} lg={9} md={10} sm={10} className="wallet ">
                  <h5>{t("credit_available")}</h5>
                  <div className="d-flex justify-content-center mt-5">
                    <IoWalletSharp className="wallet_icon" />
                    <p>
                      {" "}
                      {userWallet}
                      <t />
                      <FaCoins className="coins_icon" />
                    </p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
