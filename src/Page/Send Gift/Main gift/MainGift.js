import React, { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ContextLang } from "../../../App";
import { TbGiftCard } from "react-icons/tb";
import { IoWalletSharp } from "react-icons/io5";
import vector from "../../../images/Vector.png";
const MainGift = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);

  return (
    <div className="main_address main_credit gift_credit py-4 mb-3">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={6} md={8} sm={12} className="">
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
                  <h4 className="text-center">
                    {t("gift_title")}
                  </h4>
                </Col>

                <div className="row justify-content-center main_gift_box px-lg-5 px-md-4 ">
                  <Col
                    xs={11}
                    lg={11}
                    md={11}
                    sm={11}
                    className="total_credit card py-2"
                  >
                  <Row>
                  <Col xs={7} lg={6} md={7} sm={7} className="">
                      <h6>
                      {t("gift_h")}
                       </h6>
                      <p>
                      {t("gift_p")}
                      </p>
                      {/* <Link to="" className="Link">
                        See Details
                      </Link> */}
                    </Col>
                    <Col xs={5} lg={6} md={5} sm={5} className="">
                      <img src={vector} alt="" />
                    </Col>
                  </Row>

                  </Col>
                </div>
              </div>

              <Row className="justify-content-center ">
                <Col xs={10} lg={9} md={10} sm={10} className=" ">
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">
    {t("gift_amount")}
    </label>
    <input type="number" className="form-control" id="exampleInputEmail1" placeholder={t("gift_input_placeholder")}/>
  </div>
  <Row className="border_b">
  <Col xs={11} lg={11} md={11} sm={11} className=" massage row">
  <Col xs={10} lg={10} md={10} sm={10} className=" ">
  <p>
  {t("gift_massage")}
  </p>
</Col>
  <Col xs={2} lg={2} md={2} sm={2} className="add_link ">
  <Link to="" className="link">
  {t("gift_add")}

  </Link>
</Col>
</Col>
  <Col xs={11} lg={11} md={11} sm={11} className=" massage row">
  <Col xs={10} lg={10} md={10} sm={10} className=" ">
  <p>
  {t("gift_acount")}
  </p>
</Col>
  <Col xs={2} lg={2} md={2} sm={2} className="add_link ">
  <Link to="" className="link">
  {t("gift_add")}
  </Link>
</Col>
</Col>

  </Row>
<Row className="mb-4" >
{/* <p className="text-center">
You have to select a method to send it with
</p> */}
  <Link to="/checkout" type="submit" className="btn btn_next">  {t("gift_btn")}
</Link>
</Row>

                </Col>

              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainGift;
