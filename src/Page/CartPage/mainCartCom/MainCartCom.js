import React, { useContext, useEffect, useState } from "react";
import "../cart.css";
import { Col, Container, Row } from "react-bootstrap";
import { ServesCard } from "../../Booking/Main Booking/BookingOne/ServesCard";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetch from "../../../hooks/useFetch";
import { CartCountContext } from "../../../Context/CartCountContext";
import { ProductDetailsContext } from "../../../App";
import PriceSide from "../../../Component/priceSide/PriceSide";

export const MainCartCom = () => {
  const { t } = useTranslation();
  const { data } = useFetch("/data.json");
  const [cartData, setCartData] = useState(null);
  const { count, setCount } = useContext(CartCountContext);
  const { productDetails, saveProductDetails } = useContext(
    ProductDetailsContext
  );
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  const allCartItems = JSON.parse(localStorage.getItem("ProductOrder")) || {};
  const deliveryCost = Number(data?.Delivery_Cost) || 0;
  const shippingCost = Number(data?.Shipping_Cost) || 0;

  const grandTotal = deliveryCost + shippingCost + totalQuantity;

  const recalculateTotalPrice = () => {
    const data = JSON.parse(localStorage.getItem("all-cart-items"));
    if (data) {
      const sum = data.reduce(
        (total, currentItem) =>
          total + currentItem.price * currentItem.quantity,
        0
      );
      setTotalQuantity(sum);
    }
  };

  const updateProductOrder = () => {
    const productIds = cartData?.map((item) => item.id) || [];
    saveProductDetails({
      ...productDetails,
      grand_total: grandTotal,
      product_id: productIds,
    });
    // const updatedOrder = {
    //   ...allCartItems,
    //   grand_total: grandTotal,
    //   product_id: productIds,
    // };
    // localStorage.setItem("ProductOrder", JSON.stringify(updatedOrder));
  };

  const handleNextClick = () => {
    if (cartData) {
      updateProductOrder(); // Update the product order
    }
    localStorage.setItem("toggle", JSON.stringify(false));
    navigate("/location"); // Navigate to the location page
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("all-cart-items"));
    if (data) {
      setCartData([...data]);
      const sum = data.reduce(
        (total, currentItem) =>
          total + currentItem.price * currentItem.quantity,
        0
      );
      setTotalQuantity(sum);
    }
  }, []);

  const removeItem = (id) => {
    if (cartData) {
      const newItems = cartData.filter((item) => item.id !== id);
      setCartData([...newItems]);
      localStorage.setItem("all-cart-items", JSON.stringify(newItems));
      setCount(count - 1);
      recalculateTotalPrice();
    }
  };

  return (
    <div className="main_book main_card shopingCard py-lg-3 py-md-2 pb-5">
      <Container className="booking_container">
        <Row className="booking_row_main">
          <h2>{t("cart_title")}</h2>
          <Col xs={12} lg={7} md={7} sm={12} className="border main_col py-2">
            <div className="serves_col shopingCard">
              {count !== 0 ? (
                cartData?.map((product) => (
                  <ServesCard
                    id={product.id}
                    key={product.id}
                    img={`${product?.image}`}
                    title_ar={product.name_ar}
                    title_en={product.name_en}
                    description_ar={product.description_ar}
                    description_en={product.description_en}
                    price={product.price}
                    removeItem={removeItem}
                    recalculateTotalPrice={recalculateTotalPrice}
                    initialQuantity={product.quantity}
                  />
                ))
              ) : (
                <h2 className="text-center my-5">{t("card_shop_massage")}</h2>
              )}
              {count !== 0 && (
                <div className="row">
                  <button className="btn btn_next" onClick={handleNextClick}>
                    {t("cart_btn")}
                  </button>
                </div>
              )}
            </div>
          </Col>
          <Col xs={12} lg={5} md={4} sm={12} className="row">
            <PriceSide
              totalQuantity={totalQuantity}
              Delivery_Cost={deliveryCost}
              Shipping_Cost={shippingCost}
              priceAfterDiscount={grandTotal}
              priceBeforeDiscount={grandTotal}
              discountPercentage={0}
            />
          </Col>
          {/* <Col xs={12} lg={5} md={4} sm={12} className="row">
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
                  <h6>{t("payment_total")}</h6>
                </Col>
                <Col xs={5} lg={5} md={6} sm={5}>
                  <p>
                    {totalQuantity} {t("price")}
                  </p>
                </Col>
              </div>
              <div className="row">
                <Col xs={7} lg={7} md={6} sm={7}>
                  <h6>{t("payment_delivery")}</h6>
                </Col>
                <Col xs={5} lg={5} md={6} sm={5}>
                  <p>
                    {data?.Delivery_Cost} {t("price")}
                  </p>
                </Col>
              </div>
              <div className="row">
                <Col xs={7} lg={7} md={6} sm={7}>
                  <h6>{t("payment_taps")}</h6>
                </Col>
                <Col xs={5} lg={5} md={6} sm={5}>
                  <p>
                    {data?.Shipping_Cost} {t("price")}
                  </p>
                </Col>
              </div>
              <div className="row price_total">
                <Col xs={7} lg={7} md={6} sm={7}>
                  <h6>{t("order_total")}</h6>
                </Col>
                <Col xs={5} lg={5} md={6} sm={5}>
                  <p>
                    {grandTotal}
                    {t("price")}
                  </p>
                </Col>
              </div>
            </Col>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};
