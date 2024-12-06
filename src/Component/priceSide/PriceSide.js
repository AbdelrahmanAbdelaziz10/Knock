import React from "react";
import "./PriceSide.css";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PriceSide = ({
  totalQuantity,
  Delivery_Cost,
  Shipping_Cost,
  discountPercentage,
  priceBeforeDiscount,
  priceAfterDiscount,
}) => {
  const { t } = useTranslation();

  return (
    <Col
      xs={12}
      lg={12}
      md={12}
      sm={12}
      className="border booking_details total"
    >
      <h4>{t("payment_title")}</h4>
      <div className="row">
        <Col xs={7} lg={7} md={5} sm={7}>
          <h6>{t("payment_total")}</h6>
        </Col>
        <Col xs={5} lg={5} md={7} sm={5}>
          <p>
            {totalQuantity} {t("price")}
            <span style={{ color: "red" }}>({discountPercentage}%)</span>
          </p>
        </Col>
      </div>
      <div className="row">
        <Col xs={7} lg={7} md={7} sm={7}>
          <h6>{t("payment_delivery")}</h6>
        </Col>
        <Col xs={5} lg={5} md={5} sm={5}>
          <p>
            {Delivery_Cost} {t("price")}
          </p>
        </Col>
      </div>
      <div className="row">
        <Col xs={7} lg={7} md={7} sm={7}>
          <h6>{t("payment_taps")}</h6>
        </Col>
        <Col xs={5} lg={5} md={5} sm={5}>
          <p>
            {Shipping_Cost} {t("price")}
          </p>
        </Col>
      </div>
      <div className="row">
        <Col xs={7} lg={7} md={7} sm={7}>
          <h6>{t("Price_before_discount")}</h6>
        </Col>
        <Col xs={5} lg={5} md={5} sm={5}>
          <p>
            {priceBeforeDiscount} {t("price")}{" "}
          </p>
        </Col>
      </div>

      <div className="row price_total">
        <Col xs={7} lg={7} md={7} sm={7}>
          <h6>{t("order_total")}</h6>
        </Col>
        <Col xs={5} lg={5} md={5} sm={5}>
          <p>
            {priceAfterDiscount}
            {t("price")}
          </p>
        </Col>
      </div>
    </Col>
  );
};

export default PriceSide;
