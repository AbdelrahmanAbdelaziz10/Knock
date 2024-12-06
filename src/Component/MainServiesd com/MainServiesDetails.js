import React, { useContext, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import "../Main ProductDeteils  com/MainProductDetails.css";
import BodyDetails from "../Common Component/Deteils Com/BodyDetails";
import ProductHead from "./../Main ProductDeteils  com/ProductHead";
import serves from "../../images/Rectangle 195.png";
import { FaCircleExclamation } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import Location from "../../Page/Location/Location";
import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";
import { ContextLang, ServesDetailsContext, ToggleContext } from "../../App";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

const MainServiesDetails = ({ changeTest }) => {
  const { t } = useTranslation();
  const prams = useParams();
  const navigate = useNavigate();
  const { selectedLanguage } = useContext(ContextLang);
  const { servesDetails, saveServesDetails } = useContext(ServesDetailsContext);
  const loginFormData = JSON.parse(localStorage.getItem("loginFormData"));
  const { toggle, saveToggle } = useContext(ToggleContext);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [timeValue, setTimeValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [refactorError, setRefactorError] = useState("");
  // Fetch data from local JSON
  const { data } = useFetch("/data.json");

  // Extracting data from JSON
  const Days = data?.Days;
  const services = data?.services;
  const serviceDetails = services?.find(
    (service) => String(service.id) === String(prams.servesId)
  );

  const deliveryCost = data?.Delivery_Cost || 0;
  const grandTotalWithShipping = serviceDetails?.price + Number(deliveryCost);

  const handleDayClick = (dayId) => {
    setSelectedDayId(dayId);
  };

  const handleTimeChange = (e) => {
    setTimeValue(e.target.value);
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const addData = () => {
    if (!selectedDayId || !timeValue) {
      setRefactorError(
        "Please select a Day, Time, and enter any Notes to ensure greater Service."
      );
      return;
    } else {
      saveServesDetails({
        // ...servesDetails,
        user_id: loginFormData.id,
        service_id: prams.servesId,
        selected_day_id: selectedDayId,
        selected_time: timeValue,
        payment_method: "cash",
        notes: textValue,
        grand_total: grandTotalWithShipping,
      });
      saveToggle(true);

      navigate("/location");
    }
  };

  return (
    <>
      <div className="main_product_details pb-5 pt-3">
        <Container>
          <Row>
            <div className="row product_header  mb-4 justify-content-center">
              <div className="head_title">
                <Link to="/" className="">
                  <FaHome className="home_icon" />
                </Link>
                <Link to="" className="page1">
                  <MdKeyboardArrowRight className="home_icon" />{" "}
                  {t("home_category1")}
                </Link>
                {selectedLanguage === "en" ? (
                  <span>
                    {" "}
                    <MdKeyboardArrowRight className="home_icon" />{" "}
                    {serviceDetails?.name_en}
                  </span>
                ) : (
                  <span>
                    {" "}
                    <MdKeyboardArrowRight className="home_icon" />{" "}
                    {serviceDetails?.name_ar}
                  </span>
                )}
              </div>
            </div>
          </Row>
          <Row className="justify-content-center">
            <Col xs={11} lg={11} md={12} sm={11} className="">
              <Card className="row card_details ">
                <Row>
                  <Col xs={12} lg={4} md={4} sm={12} className="">
                    <div className="product_img">
                      <img src={serviceDetails?.image} alt="" />
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    lg={8}
                    md={8}
                    sm={12}
                    className="row details_row"
                  >
                    <div className="details">
                      <h4 className="product_name">
                        {selectedLanguage === "en"
                          ? serviceDetails?.name_en
                          : serviceDetails?.name_ar}
                      </h4>
                      {selectedLanguage === "en" ? (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: serviceDetails?.description_en,
                          }}
                        />
                      ) : (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: serviceDetails?.description_ar,
                          }}
                        />
                      )}
                    </div>
                    <div className="stock mb-3">
                      <h4>
                        {t("details_sku")} <span>{serviceDetails?.code}</span>
                      </h4>
                    </div>
                    <div className="price_serves stock mb-3 row">
                      <Col xs={12} lg={4} md={6} sm={12}>
                        <h4>
                          {t("details_serves_price")}
                          <span>
                            {" "}
                            {serviceDetails?.price} {t("price")}
                          </span>
                        </h4>
                      </Col>
                      <Col xs={12} lg={6} md={6} sm={12}>
                        <h4>
                          {t("details_serves_delivery")}
                          <span>
                            {" "}
                            {data?.Delivery_Cost} {t("price")}
                          </span>
                        </h4>
                      </Col>
                    </div>
                  </Col>
                </Row>
                <div className="time_date">
                  <div className="delivery_date row mb-4">
                    <Col xs={11} lg={10} md={12} sm={11} className=" date_day">
                      <h5 className="my-2">{t("details_date")}</h5>
                      {Days && (
                        <Row className="d-flex justify-content-between mt-4 ">
                          {Days?.map((day, idx) => {
                            return (
                              <Col
                                xs={3}
                                lg={1}
                                md={1}
                                sm={4}
                                className="d-flex day_booking"
                                key={day.id}
                              >
                                <p
                                  className={`btn btn_day action ${
                                    selectedDayId === day.id ? "active" : ""
                                  }`}
                                  onClick={() => handleDayClick(day.id)}
                                >
                                  {selectedLanguage === "en"
                                    ? day.name_en
                                    : day.name_ar}
                                </p>
                              </Col>
                            );
                          })}
                        </Row>
                      )}
                    </Col>
                    <Col xs={12} lg={5} md={6} sm={12} className="">
                      <h5>{t("details_time")}</h5>
                      <div className="time_input">
                        <input
                          type="time"
                          className="input_time"
                          value={timeValue}
                          onChange={handleTimeChange}
                        />
                      </div>
                    </Col>
                  </div>
                </div>
                <Row>
                  <Col xs={12} lg={6} md={6} sm={12}>
                    <div className="nots mb-4">
                      <FaCircleExclamation className="icon" />
                      <p>{t("serves_details_massage")}</p>
                    </div>
                  </Col>
                  <Col xs={12} lg={6} md={6} sm={12}>
                    <div className="nots nots_add mb-4">
                      <p>{t("details_nots_p")}</p>
                      <input
                        type="text"
                        className=" form-control input_nots"
                        placeholder={t("details_nots_placeholder")}
                        value={textValue}
                        onChange={handleTextChange}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="row time_date">
                  <div className="col-lg-12 row justify-content-center add_btn ">
                    <Col
                      xs={11}
                      lg={5}
                      md={5}
                      sm={11}
                      className="col-lg-5 col-md-5 mt-2"
                    >
                      <button className=" total_price mt-2">
                        <span>{t("total_price")}</span>
                        {grandTotalWithShipping}
                        <span className="price"> {t("price")}</span>
                      </button>
                    </Col>
                    <Col
                      xs={11}
                      lg={4}
                      md={3}
                      sm={11}
                      className="col-lg-4 col-md-3 mt-3 "
                    >
                      <button onClick={addData} className="btn btn-Add next">
                        {t("gift_btn")}
                      </button>
                    </Col>
                    {refactorError && (
                      <Alert className="Alert" variant="danger">
                        {refactorError}
                      </Alert>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainServiesDetails;
