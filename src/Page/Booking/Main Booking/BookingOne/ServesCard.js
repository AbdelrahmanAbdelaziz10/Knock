import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { i18n } from "i18next";
import { useTranslation } from "react-i18next";
import { ContextLang } from "../../../../App";
import { MdDelete } from "react-icons/md";

export const ServesCard = ({
  id,
  img,
  title_ar,
  title_en,
  description_ar,
  description_en,
  price,
  removeItem,
  recalculateTotalPrice,
  initialQuantity,
}) => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage } = useContext(ContextLang);
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("all-cart-items"));
    if (cartItems) {
      let newData = cartItems?.map((item) => {
        if (item.id === id) {
          item.quantity = quantity;
          return item;
        }
        return item;
      });

      localStorage.setItem("all-cart-items", JSON.stringify(newData));

      recalculateTotalPrice();
    }
  }, [quantity]);

  return (
    <Card className="book_card ">
      <div className="row add_serves">
        <Col xs={4} lg={3} md={4} sm={4}>
          <div className="serv_img">
            <img src={img} alt="" />
          </div>
        </Col>
        <Col xs={8} lg={9} md={8} sm={8}>
          <div className="serv_text ">
            {selectedLanguage === "en" ? (
              <>
                <h6>{title_en}</h6>
                <p dangerouslySetInnerHTML={{__html:description_en}}/>
              </>
            ) : (
              <>
                <h6>{title_ar}</h6>
                <p dangerouslySetInnerHTML={{__html:description_ar}}/>
              </>
            )}

            <Row>
              <Col xs={4} lg={4} md={4} sm={4}>
                <span>
                  {t("price")} {price}
                </span>
              </Col>
              <Col xs={1} lg={4} md={2} sm={1} >
              <MdDelete className="Delete_Icon"
              onClick={() => removeItem(id)}
            />
              </Col> 
              <Col xs={6} lg={4} md={6} sm={6} className="d-flex">
                <button
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                  className=" btn btn_decrease"
                >
                  <IoRemoveOutline className="add_icon" />
                </button>
                <span className="">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className=" btn btn_decrease"
                >
                  <IoAddOutline className="add_icon" />
                </button>
              </Col>
            </Row>
          </div>
        </Col>
        {/* <Col xs={12} lg={5} md={4} sm={12} className="row ">
          <Col
            xs={12}
            lg={12}
            md={12}
            sm={12}
            className="border booking_details total"
          >
            <h4>
              {t("payment_title")}
            </h4>
            <div className="row">
              <Col xs={7} lg={7} md={6} sm={7}>
                <h6 className=" ">{t("payment_total")}</h6>
              </Col>
              <Col xs={5} lg={5} md={6} sm={5}>
                <p className=""> {quantity * price} {t("price")}</p>
              </Col>
            </div>
            <div className="row">
              <Col xs={7} lg={7} md={6} sm={7}>
                <h6 className=" ">
                  {t("payment_delivery")}
                </h6>
              </Col>
              <Col xs={5} lg={5} md={6} sm={5}>
                <p className="">{setting?.data?.delivery_cost}  {t("price")} </p>
              </Col>
            </div>
            <div className="row">
              <Col xs={7} lg={7} md={6} sm={7}>
                <h6 className=" ">
                  {t("payment_taps")}
                </h6>
              </Col>
              <Col xs={5} lg={5} md={6} sm={5}>
                <p className="">{setting?.data?.shipping_cost} {t("price")}</p>
              </Col>
            </div>
            <div className="row price_total">
              <Col xs={7} lg={7} md={6} sm={7}>
                <h6 className=" ">{t("order_total")}</h6>
              </Col>
              <Col xs={5} lg={5} md={6} sm={5}>
                <p className="">{Number(setting?.data?.shipping_cost) + Number(setting?.data?.delivery_cost) + (quantity * price)} {t("price")}</p>
              </Col>
            </div>
          </Col>
        </Col> */}
      </div>
    </Card>
  );
};
