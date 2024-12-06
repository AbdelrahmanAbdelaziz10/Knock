import React, { useContext, useState } from "react";
import "./MainProductDetails.css";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";
import { ContextLang, ProductDetailsContext } from "../../App";
import { FaCircleExclamation, FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CartCountContext } from "../../Context/CartCountContext";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const MainProductDetails = () => {
  const { t } = useTranslation();
  const { data } = useFetch("/data.json");
  const { selectedLanguage } = useContext(ContextLang);
  const { count, setCount } = useContext(CartCountContext);

  const productParams = useParams();
  const allProduct = data?.products || [];
  const product = allProduct.find(
    (item) => item.id.toString() === productParams.productId
  );

  const [refactorError, setRefactorError] = useState("");

  // Early return if product is not found
  if (!product) {
    return <h2 className="text-center">{t("no_products")}</h2>;
  }

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("all-cart-items")) || [];
    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      Swal.fire({
        title:
          selectedLanguage === "ar"
            ? "هذا المنتج موجود بالفعل"
            : "This product is already available.",
      });
      return;
    }

    const newCartItem = { ...product, quantity: 1 };
    localStorage.setItem(
      "all-cart-items",
      JSON.stringify([...cartItems, newCartItem])
    );

    toast.success(
      selectedLanguage === "ar"
        ? "تم إضافة المنتج إلى السلة"
        : "Product added to cart",
      {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      }
    );

    setCount((prev) => prev + 1);
  };

  const renderProductDetails = () => (
    <Card className="row card_details">
      <Row>
        {/* Product Image */}
        <Col xs={12} lg={4} md={4} sm={12}>
          <div className="product_img">
            <img src={product.image} alt={product.name_en} />
          </div>
        </Col>

        {/* Product Info */}
        <Col xs={12} lg={8} md={8} sm={12} className="row details_row">
          <div className="details">
            <p>{t("product")}</p>
            <h4 className="product_name">
              {selectedLanguage === "en" ? product.name_en : product.name_ar}
            </h4>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  selectedLanguage === "en"
                    ? product.description_en
                    : product.description_ar,
              }}
            />
          </div>

          {/* Stock Details */}
          <div className="stock mb-2 d-flex gap-5">
            <h4>
              {t("details_sku")} <span>{product.code}</span>
            </h4>
            <h4>
              {t("details_avilable")} <span>{product.quantity}</span>
            </h4>
          </div>

          {/* Price and Discount */}
          <div className="price_serves stock mb-3 row">
            <Col xs={6} sm={6}>
              <h4>
                {t("the_price")}
                <span> {product.price} $</span>
              </h4>
            </Col>
            <Col xs={6} sm={6}>
              <h4>
                {t("details_serves_discount")}
                <span className="discount">{product.discount}%</span>
              </h4>
            </Col>
          </div>
        </Col>
      </Row>

      {/* Add to Cart Button */}
      <Row className="time_date">
        <div className="row justify-content-center add_btn">
          <Col xs={12} lg={9} className="mt-3">
            <button onClick={addToCart} className="btn btn-Add">
              {t("details_btn")}
            </button>
            <ToastContainer />
          </Col>
          {refactorError && (
            <Alert className="Alert" variant="danger">
              {refactorError}
            </Alert>
          )}
        </div>
      </Row>
    </Card>
  );

  return (
    <div className="main_product_details pb-5 pt-3">
      <Container>
        {/* Breadcrumb */}
        <Row>
          <div className="row product_header mb-4 justify-content-center">
            <div className="head_title">
              <Link to="/">
                <FaHome className="home_icon" />
              </Link>
              <MdKeyboardArrowRight className="home_icon" />
              <span>{t("all_product_product")}</span>
              <MdKeyboardArrowRight className="home_icon" />
              <span>
                {selectedLanguage === "en" ? product.name_en : product.name_ar}
              </span>
            </div>
          </div>
        </Row>

        {/* Product Details */}
        <Row className="justify-content-center">
          <Col xs={11} lg={11} md={12} sm={11}>
            {renderProductDetails()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainProductDetails;
