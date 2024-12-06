import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ContextLang, LoginFormDataContext } from "../../../App";

const BookingDetails = ({ address, country, name_en, name_ar, phone }) => {
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(ContextLang);
// console.log(name_en)
  return (
    <Col xs={12} lg={12} md={12} sm={12} className="border booking_details">
      <h4>{t("booking_title")}</h4>
      <div className="row">
        <h6 className="col-lg-5 col-md-12">{t("booking_address")}</h6>
        {/* <p className="col-lg-7 col-md-12"> {t("booking_address_add")}</p> */}
        <p className="col-lg-7 col-md-12">
          {address}-{country}
        </p>
      </div>
      <div className="row">
        <h6 className="col-lg-5">{t("booking_serves")}</h6>
        {selectedLanguage === "en" ? 
          <p className="col-lg-7">{name_en}</p>
         : 
          <p className="col-lg-7">{name_ar}</p>
        }
      </div>
      <div className="row d-flex">
        <h6 className="col-lg-5">{t("booking_phone")}</h6>
        <p className="serves_name col-lg-7">{phone}</p>
      </div>
    </Col>
  );
};

export default BookingDetails;
