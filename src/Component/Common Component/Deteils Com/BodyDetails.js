import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import CustomInput from "./CustomInput";
import "./BodyDeteils.css";
import { IoAddOutline } from "react-icons/io5";
import { IoRemoveOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import { ContextLang } from "../../../App";

const BodyDetails = ({ serveDetails }) => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(null);
  const { data: day } = useFetch("/api/v1/days/get-all");

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="body_details my-4">
      <Row>
        <div className="description">
          {selectedLanguage === "en" ? (
            <>
              <h4>{serveDetails?.name_en}</h4>
              <p
                    dangerouslySetInnerHTML={{
                      __html: serveDetails?.description_en,
                    }}
                  />            </>
          ) : (
            <>
              <h4>{serveDetails?.name_ar}</h4>
              <p
                    dangerouslySetInnerHTML={{
                      __html: serveDetails?.description_ar,
                    }}
                  />            </>
          )}
        </div>
        <div className="stock mb-3">
          <h4 className="mb-3">
            {t("details_avilable")} <span>{serveDetails?.quantity}</span>
          </h4>
          <h4>
            {t("details_sku")} <span>{serveDetails?.sku}</span>
          </h4>
        </div>
        <div className="price_serves stock mb-2 row">
        <Col xs={6} lg={6} md={6} sm={6}>
        <h4>
            {t("details_serves_price")}
            <span> {serveDetails?.price} $</span>
          </h4>
        </Col>
        {/* <Col xs={6} lg={6} md={6} sm={6}>
        <h4>
            {t("details_serves_discount")}
            <span className="discount"> {serveDetails?.discount}%</span>
          </h4> 
        </Col>*/}
        </div>
        <div className="time_date">
          {/* <h5 className="mb-3">Select date and time of delivery</h5> */}
          <div className="delivery_date row mb-4">
            <Col xs={11} lg={10} md={12} sm={11} className=" date_day">
              <h5 className="my-2">
                {t("details_date")}
                {/* Chose best Delivery <span>Date</span>{" "} */}
              </h5>
              {/* <label><Datepicker selected={selectDate} onChange={date=>setSelectDate(date)}  customInput={<CustomInput />}/></label>  */}
              {day && (
                <Row className="d-flex justify-content-between mt-4 ">
                  {day.data.map((day, idx) => {
                    return (
                      <Col
                        xs={3}
                        lg={1}
                        md={1}
                        sm={4}
                        className="d-flex day_booking"
                        key={day.id}
                      >
                        {selectedLanguage === "en" ? (
                          <p className="btn btn_day action">{day.name_en}</p>
                        ) : (
                          <p className="btn btn_day action">{day.name_ar}</p>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Col>
            <div className="col-lg-12 col-md-6">
              <h5>{t("details_time")}</h5>
              <div className="time_input">
                <input type="time" className="input_time" />
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default BodyDetails;
