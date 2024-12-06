import React, { useContext, useEffect, useState } from "react";
import "./MainBook.css";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import BookHead from "../Book Head/BookHead";
import { ServesCard } from "./ServesCard";
import serves from "../../../../images/Rectangle 195.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PaymentSummary from "../../../Checkout/mainCheckout/PaymentSummary";
import BookingDetails from "../../../Checkout/mainCheckout/BookingDetails";
import { ContextLang, OrderDataContext, ProductDetailsContext, ToggleContext } from "../../../../App";
import useFetch from "../../../../hooks/useFetch";
import ProductHead from "../../../../Component/Main ProductDeteils  com/ProductHead";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

const MainBook = () => {
  const { t } = useTranslation();
  const { saveProductDetails,productDetails } = useContext(ProductDetailsContext);
  const { saveToggle,toggle } = useContext(ToggleContext);
  const { selectedLanguage } = useContext(ContextLang);
  const productPrams = useParams();
  const navigate = useNavigate();
  const loginFormData = JSON.parse(localStorage.getItem('loginFormData'));
  const { data: setting } = useFetch("/api/v1/settings/get-all");
//  console.log(productPrams)
  const { data: product_id } = useFetch(`/api/v1/products/get-product-details?product_id=${productPrams.productId}`);
// console.log(product_id)
  const [shopingCost,setShopingCost]=useState(setting?.data?.shipping_cost)
  const [increase, setIncrease] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [timeValue, setTimeValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [refactorError, setRefactorError] = useState("");

  const increseNumber = () => {
    setIncrease((prevIncrease) => prevIncrease + 1);
  };

  const decreseNumber = () => {
    if (increase > 0) setIncrease((prevIncrease) => prevIncrease - 1);
  };

  const handleDayClick = (dayId) => {
    setSelectedDayId(dayId);
  };

  const handleTimeChange = (e) => {
    setTimeValue(e.target.value);
  };
  const newGrandTotal = (+product_id?.data?.price_after_discount + (+setting?.data?.shipping_cost || 0)).toFixed(2);
  const grandTotalWithShipping = (newGrandTotal* increase).toFixed(2);


  const addProduct = () => {
    if (!selectedDayId || !timeValue || !textValue) {
      // Handle validation error, e.g., show an alert
      setRefactorError("Please select a Day, Time, and enter any Notes to ensure greater Service.");
      return;
    } else {
    setGrandTotal(grandTotalWithShipping);
    saveProductDetails({
      user_id: loginFormData.id,
      selected_day_id: selectedDayId,
      selected_time: timeValue,
      payment_method: "cash",
      notes: textValue,
      product_ids:JSON.stringify([productPrams.productId]),
      product_quantities:JSON.stringify([increase]),
      discount_amount: product_id?.data?.discount,
      price_after_discount: product_id?.data?.price_after_discount,
      grand_total: grandTotalWithShipping,
    });
    saveToggle(false);
    navigate("/location");

    // console.log(productDetails)
    // console.log(toggle)
  }
  };

  useEffect(() => {
    setGrandTotal(grandTotalWithShipping);
  }, [increase, product_id?.data?.price_after_discount]);
  const servesOrderData = JSON.parse(localStorage.getItem("servesOrderData"));
// console.log(servesOrderData?.data)
  return (
    <div className="main_product_details py-3">
    {/* <Container>
    <div className="row">
        <ProductHead
          img={`https://dashboard.knock-knock.ae/${product_id?.data.image}`}
          page1={t("all_product_product")}
          page2_ar={product_id?.data?.name_ar}
          page2_en={product_id?.data?.name_en}

        />
      </div>

      <div className="body_details my-4">
        <Row>
          <div className="description">
            <h4>
              {selectedLanguage === "en"
                ? product_id?.data?.name_en
                : product_id?.data?.name_ar}
            </h4>
            {selectedLanguage === "en" ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: product_id?.data?.description_en,
                }}
              />
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: product_id?.data?.description_ar,
                }}
              />
            )}
          </div>
          <div className="stock mb-3">
            <h4 className="mb-3">
              {t("details_avilable")}
              <span>{product_id?.data?.quantity}</span>
            </h4>
            <h4>
              {t("details_sku")} <span>{product_id?.data?.code}</span>
            </h4>
          </div>
          <div className="price_serves stock mb-2 row">
            <Col xs={6} lg={4} md={4} sm={6}>
              <h4>
                {t("details_serves_price")}
                <span> {product_id?.data?.price} $</span>
              </h4>
            </Col>
            <Col xs={6} lg={4} md={4} sm={6}>
              <h4>
                {t("details_serves_discount")}
                <span className="discount">
                  {product_id?.data?.discount}%
                </span>
              </h4>
            </Col>
            <Col xs={10} lg={4} md={4} sm={10}>
              <h4>
                {t("details_serves_shopping")}
                <span className="">
                  {setting?.data?.shipping_cost} </span><span>{t("price")}
                </span>
              </h4>
            </Col>
          </div>
          <div className="time_date">
            <div className="delivery_date row mb-4">
              <Col xs={11} lg={10} md={12} sm={11} className=" date_day">
                <h5 className="my-2">{t("details_date")}</h5>
              </Col>
            </div>
          </div>
        </Row>
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
              onChange={(e) => setTextValue(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <div className="row time_date">
        <div className="col-lg-12 row justify-content-center add_btn ">
          <Col xs={6} lg={3} md={4} sm={6} className="col-lg-3 col-md-4">
            <button className="btn decincrease" onClick={decreseNumber}>
              <IoRemoveOutline className="remove" />
            </button>
            <span>{increase}</span>
            <button className="btn increase" onClick={increseNumber}>
              <IoAddOutline className="add" />
            </button>
          </Col>
          <Col
            xs={6}
            lg={5}
            md={5}
            sm={6}
            className="col-lg-5 col-md-5 mt-2"
          >
            <button className=" total_price mt-2">
              <span>{t("total_price")}</span>
              {grandTotal}
              {t("price")}
            </button>
          </Col>
          <Col
            xs={12}
            lg={4}
            md={3}
            sm={12}
            className="col-lg-4 col-md-3 mt-3 "
          >
            <button onClick={addProduct}  className="btn btn-Add">
              {t("details_btn")}
            </button>
          </Col>
          {refactorError && (
            <Alert className="Alert" variant="danger">{refactorError} </Alert>
          )}
        </div>
      </div>
    </Container> */}
  </div>
    // <div className="main_book main_card py-lg-3 py-md-2 pb-5">
    //   <Container className=" booking_container">
    //     <Row className="booking_row_main ">
    //     <div className="row">
    //     <Col xs={10} lg={10} md={10} sm={10} >
    //     <h2>
    //       {t("booking_title2")}
    //     </h2>
    //     </Col>
    //     <Col xs={2} lg={2} md={2} sm={2} >
    //     <button className="btn btn_cancelled">
    //     {t("order_cancelled")}
    //     </button>
    //     </Col>
    //     </div>
    //       {/* <BookHead stepnum={1} title={"Serves Details"} /> */}
    //       <Col
    //         xs={12}
    //         lg={7}
    //         md={8}
    //         sm={12}
    //         className="border main_col serves_col py-2"
    //       >
    //         <div className="">
    //         <ServesCard
    //             img={servesOrderData?.data[0]?.service.image}
    //             title_ar={servesOrderData?.data[0]?.service?.name_ar}
    //             title_en={servesOrderData?.data[0]?.service?.name_en}
    //             description_ar={servesOrderData?.data[0]?.service?.description_ar}
    //             description_en={servesOrderData?.data[0]?.service?.description_en}
    //             price={servesOrderData?.data[0]?.service?.price}
    //           />
              
    //         </div>
    //       </Col>
    //       <Col xs={12} lg={5} md={4} sm={12} className="row ">
    //       <BookingDetails address={servesOrderData?.data[0]?.address}
    //       country={servesOrderData?.data[0]?.country} 
    //       name_ar={servesOrderData?.data[0]?.service?.name_ar}
    //       name_en={servesOrderData?.data[0]?.service?.name_en}
    //       />
    //         <PaymentSummary 
    //         subtotal={servesOrderData?.data[0]?.service?.price}
    //         grand_total={servesOrderData?.data[0]?.grand_total}
    //         />

    //       </Col>
    //     </Row>
    //   </Container>
    // </div>

  );
};

export default MainBook;
