import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AllServes/AllServes.css";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ContextLang,
  NumberProductContext,
  ToggleLoginContext,
} from "../../../App";
import { toast } from "react-toastify";
import { FaCartShopping } from "react-icons/fa6";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useShoppingCart } from "../../../Context/ShopingCardContext";
import { CartCountContext } from "../../../Context/CartCountContext";
import { MdAddShoppingCart } from "react-icons/md";
import Swal from "sweetalert2";

const OneProduct = ({ link, productObj }) => {
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(ContextLang);
  const native = useNavigate();
  const { saveToggleLogin } = useContext(ToggleLoginContext);
  const toggleLogin = JSON.parse(localStorage.getItem("toggleLogin"));
  const {
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(productObj?.id);

  const [increase, setIncrease] = useState(0);

  const { count, setCount } = useContext(CartCountContext);

  const navigate = useNavigate();

  const handelLogInPage = () => {
    Swal.fire({
      icon: "error",
      title: selectedLanguage === "ar" ? "عذرًا..." : "Oops...",
      text:
        selectedLanguage === "ar"
          ? "يجب أن يكون لديك حساب أولاً لاستخدام هذه الخدمة"
          : "You Must Have an Account First To Use This Service",
      confirmButtonText:
        selectedLanguage === "ar" ? "انتقل إلى تسجيل الدخول" : "Go to Login",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const increseNumber = () => {
    setIncrease((prevIncrease) => prevIncrease + 1);
  };

  const decreseNumber = () => {
    if (increase > 0) setIncrease((prevIncrease) => prevIncrease - 1);
  };

  const addToCart = () => {
    const oldCartItems = JSON.parse(localStorage.getItem("all-cart-items"));
    let obj = { ...productObj, quantity: 1 };
    if (oldCartItems) {
      let isAddedBefore = oldCartItems?.find(
        (item) => item.id === productObj.id
      );
      if (isAddedBefore) {
        toast.info(
          selectedLanguage === "ar"
            ? "تمت إضافة هذا المنتج بالفعل إلى السلة"
            : "This product is already added to the cart"
        );
        return;
      } else {
        toast.success(
          selectedLanguage === "ar"
            ? "تمت إضافة المنتج بنجاح"
            : "Product added successfully"
        );
      }
      localStorage.setItem(
        "all-cart-items",
        JSON.stringify([...oldCartItems, obj])
      );
      setCount(count + 1);
    } else {
      localStorage.setItem("all-cart-items", JSON.stringify([obj]));
      setCount(count + 1);
      toast.success(
        selectedLanguage === "ar"
          ? "تمت إضافة المنتج بنجاح"
          : "Product added successfully"
      );
    }
  };

  return (
    <>
      {toggleLogin === true ? (
        <div className="card one_Product">
          <div className="card_image_product">
            <img src={productObj?.image} alt="" />
          </div>
          <div className="card_text_product">
            {selectedLanguage === "en" ? (
              <p>{productObj?.name_en}</p>
            ) : (
              <p>{productObj?.name_ar}</p>
            )}
            <h6>
              {productObj?.price} {t("price")}
              <span>{productObj?.discount} %</span>
            </h6>

            <div className="row">
              {quantity === 0 ? (
                <>
                  <Col xs={2} lg={2} md={4} sm={2} className="shopIcon_div ">
                    <MdAddShoppingCart
                      onClick={addToCart}
                      className="shopIcon"
                    />
                  </Col>
                  <Col xs={10} lg={9} md={8} sm={10} className="details_btn">
                    <button
                      onClick={() => native(link)}
                      className="btn btn-deteils"
                    >
                      {t("all_product_product_btn")}
                    </button>
                  </Col>
                </>
              ) : (
                <div className="row justify-content-between">
                  <Col
                    xs={6}
                    lg={3}
                    md={4}
                    sm={6}
                    className=" d-flex col-lg-3 col-md-4"
                  >
                    <button
                      className="btn decincrease"
                      onClick={() => decreaseCartQuantity(productObj?.id)}
                    >
                      <IoRemoveOutline className="remove" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="btn increase"
                      onClick={() => increaseCartQuantity(productObj?.id)}
                    >
                      <IoAddOutline className="add" />
                    </button>
                  </Col>
                  <Col
                    xs={6}
                    lg={3}
                    md={4}
                    sm={6}
                    className=" col-lg-3 col-md-4"
                  >
                    <MdDelete
                      className="delete"
                      onClick={() => removeFromCart(productObj?.id)}
                    />
                  </Col>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="card log_out_card one_Product"
          onClick={handelLogInPage}
        >
          <div className="card_image_product">
            <img src={productObj?.image} alt="" />
          </div>
          <div className="card_text_product">
            {selectedLanguage === "en" ? (
              <p>{productObj?.name_en}</p>
            ) : (
              <p>{productObj?.name_ar}</p>
            )}
            <h6>
              {productObj?.price} {t("price")}
              <span>{productObj?.discount} %</span>
            </h6>
          </div>
        </div>
      )}
    </>
  );
};

export default OneProduct;
