import React, { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ContextLang } from "../../../App";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbGiftCard } from "react-icons/tb";
import { IoWalletSharp } from "react-icons/io5";
import CreditSwiper from "./Credit Packages/CreditSwiper";
import useFetch from "../../../hooks/useFetch";

const MainBuyCredit = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);

  return (
    <div className="main_buy">
      <div className="row justify-content-center ">
        <Col
          xs={10}
          lg={6}
          md={7}
          sm={10}
          className="text-center pt-3 knock_credit"
        >
          {/* <p className=''>Knock Knock</p> */}
          <h4>{t("buy_credit_title")}</h4>
        </Col>
      </div>
      <div className="main_address main_buy_credit py-4 mb-3">
        <Container>
          <Row className="justify-content-center">
            <Col xs={11} lg={8} md={11} sm={11} className="">
              <Card className="address_card">
                <div className="row d-flex credit_transition">
                  <Col xs={1} lg={1} md={1} sm={1}>
                    <Link to="/credits">
                      {selectedLanguage === "ar" ? (
                        <FaArrowRight className=" arrow_icon arrow_icon_ar" />
                      ) : (
                        <FaArrowLeft className="arrow_icon arrow_icon_en" />
                      )}
                    </Link>
                  </Col>
                  <Col xs={10} lg={9} md={10} sm={10} className="">
                    <h4 className="text-center">{t("buy_credit_h")}</h4>
                  </Col>
                </div>

                <Row className="justify-content-center">
                  <Col
                    xs={10}
                    lg={8}
                    md={10}
                    sm={10}
                    className=" text-center buy_credit card"
                  >
                    <p>{t("credit_buy_p")}</p>
                  </Col>
                </Row>

                <Row className="justify-content-center ">
                  <Col
                    xs={10}
                    lg={9}
                    md={10}
                    sm={10}
                    className=" send_gift"
                  ></Col>
                  <Col xs={11} lg={11} md={11} sm={11} className="wallet mt-2">
                    <CreditSwiper />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MainBuyCredit;
