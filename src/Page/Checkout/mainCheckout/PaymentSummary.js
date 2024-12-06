import React from 'react'
import { Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import useFetch from '../../../hooks/useFetch';

const PaymentSummary = ({subtotal,grand_total}) => {
    const { t, i18n } = useTranslation();
    const {data:setting}=useFetch("/api/v1/settings/get-all");
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
      <Col xs={7} lg={7} md={6} sm={7}>
        <h6 className=" ">{t("payment_total")}</h6>
      </Col>
      <Col xs={5} lg={5} md={6} sm={5}>
        <p className=""> {subtotal} {t("price")}</p>
      </Col>
    </div>
    <div className="row">
      <Col xs={7} lg={7} md={6} sm={7}>
        <h6 className=" ">{t("payment_delivery")}</h6>
      </Col>
      <Col xs={5} lg={5} md={6} sm={5}>
        <p className="">{setting?.data?.delivery_cost}{t("price")} </p>
      </Col>
    </div>
    {/* <div className="row">
      <Col xs={7} lg={7} md={6} sm={7}>
        <h6 className=" ">{t("payment_taps")}</h6>
      </Col>
      <Col xs={5} lg={5} md={6} sm={5}>
        <p className="">{setting?.data?.shipping_cost} {t("price")}</p>
      </Col>
    </div> */}
    <div className="row price_total">
      <Col xs={7} lg={7} md={6} sm={7}>
        <h6 className=" ">{t("order_total")}</h6>
      </Col>
      <Col xs={5} lg={5} md={6} sm={5}>
        <p className="">{grand_total} {t("price")}</p>
      </Col>
    </div>
  </Col>
  )
}

export default PaymentSummary