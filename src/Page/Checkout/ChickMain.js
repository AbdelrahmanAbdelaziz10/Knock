import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { FaCircleExclamation } from "react-icons/fa6";
import {
  ContextLang,
  ProductDetailsContext,
  ServesDetailsContext,
  ToggleContext,
} from "../../App";
import { useNavigate } from "react-router-dom";
import { CartCountContext } from "../../Context/CartCountContext";
import useFetch from "../../hooks/useFetch";
import PriceSide from "../../Component/priceSide/PriceSide";
import { toast, ToastContainer } from "react-toastify";

const ChickMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { servesDetails, saveServesDetails } = useContext(ServesDetailsContext);
  // const { toggle } = useContext(ToggleContext);
  const { productDetails, saveProductDetails } = useContext(
    ProductDetailsContext
  );
  const { selectedLanguage } = useContext(ContextLang);
  const { data } = useFetch("/data.json");
  const Coupon = data?.Discount || [];
  const { count, setCount } = useContext(CartCountContext);
  const toggle = JSON.parse(localStorage.getItem("toggle"));

  const deliveryCost = Number(data?.Delivery_Cost) || 0;
  const shippingCost = Number(data?.Shipping_Cost) || 0;

  let productOrderDetails = {};
  let productTotalQuantity = 0;
  let productGrandTotal = 0;
  let servesOrderDetails = {};
  let servesGrandTotal = 0;
  let servesTotalQuantity = 0;
  if (!toggle) {
    productOrderDetails =
      JSON.parse(localStorage.getItem("ProductOrder")) || {};
    productGrandTotal = Number(productOrderDetails?.grand_total || 0);
    productTotalQuantity = productGrandTotal - deliveryCost - shippingCost;
    if (productTotalQuantity < 1) productTotalQuantity = 0;
  } else if (toggle) {
    servesOrderDetails = JSON.parse(localStorage.getItem("servesOrder")) || {};
    servesGrandTotal = Number(servesOrderDetails?.grand_total || 0);
    servesTotalQuantity = servesGrandTotal - deliveryCost;
    if (servesTotalQuantity < 1) servesTotalQuantity = 0;
  }

  const [payment, setPayment] = useState("cash");
  const [coupon, setCoupon] = useState(0);
  const [couponName, setCouponName] = useState("");

  useEffect(() => {
    if (toggle) {
      const savedServesOrder =
        JSON.parse(localStorage.getItem("servesOrder")) || {};
      saveServesDetails(savedServesOrder); // Load service details from localStorage
    } else if (!toggle) {
      const savedProductOrder =
        JSON.parse(localStorage.getItem("ProductOrder")) || {};
      saveProductDetails(savedProductOrder); // Load product details from localStorage
    }
  }, [toggle, saveServesDetails, saveProductDetails]);

  const handlePaymentChange = (payway) => {
    setPayment(payway);

    const updatedServesDetails = { ...servesDetails, payment_method: payway };
    const updatedProductDetails = { ...productDetails, payment_method: payway };

    saveServesDetails(updatedServesDetails);
    localStorage.setItem("servesOrder", JSON.stringify(updatedServesDetails));

    saveProductDetails(updatedProductDetails);
    localStorage.setItem("ProductOrder", JSON.stringify(updatedProductDetails));
  };

  const applyCoupon = () => {
    if (!couponName || couponName.trim() === "") {
      toast.error(
        selectedLanguage === "ar"
          ? "يرجى إدخال رمز الخصم."
          : "Please enter a coupon code.",
        { autoClose: 3000 }
      );
      return;
    }

    const foundCoupon = Coupon.find(
      (coupon) =>
        coupon.Discount_coupon.toLowerCase() === couponName.trim().toLowerCase()
    );

    if (foundCoupon) {
      setCoupon(foundCoupon?.Discount_rate);
      const discountPercentage = toggle
        ? servesTotalQuantity
        : productTotalQuantity;
      const priceBeforeDiscount = toggle ? servesGrandTotal : productGrandTotal;
      const discountAmount =
        (foundCoupon?.Discount_rate * discountPercentage) / 100;
      const priceAfterDiscount = priceBeforeDiscount - discountAmount;

      toast.success(
        selectedLanguage === "ar"
          ? "تم تطبيق رمز الخصم بنجاح."
          : "Coupon applied successfully.",
        { autoClose: 3000 }
      );

      if (toggle) {
        saveServesDetails({
          ...servesDetails,
          discount_percentage: discountPercentage,
          price_before_discount: priceBeforeDiscount,
          price_after_discount: priceAfterDiscount,
        });
      } else {
        saveProductDetails({
          ...productDetails,
          discount_percentage: discountPercentage,
          price_before_discount: priceBeforeDiscount,
          price_after_discount: priceAfterDiscount,
        });
      }
    } else {
      toast.error(
        selectedLanguage === "ar"
          ? "لم يتم العثور على رمز الخصم."
          : "Coupon not found.",
        { autoClose: 3000 }
      );
    }
  };

  const handleSubmit = async () => {
    try {
      const User = JSON.parse(localStorage.getItem("loginFormData"));

      if (!User) {
        toast.error(
          selectedLanguage === "ar"
            ? "يرجى تسجيل الدخول قبل المتابعة."
            : "Please log in before proceeding.",
          { autoClose: 3000 }
        );
        return;
      }
      if (payment === "cash") {
        const resetDetails = {
          discount_percentage: 0,
          price_before_discount: 0,
          price_after_discount: 0,
          grand_total: 0,
        };

        if (toggle) {
          saveServesDetails(resetDetails);
          localStorage.removeItem("servesOrder");
        } else {
          saveProductDetails(resetDetails);
          localStorage.removeItem("ProductOrder");
        }
        localStorage.removeItem("toggle");

        Swal.fire({
          icon: "success",
          title:
            selectedLanguage === "ar"
              ? "تمت العملية بنجاح."
              : "The process is done.",
          confirmButtonText: selectedLanguage === "ar" ? "حسناً" : "OK",
        }).then(() => {
          navigate("/"); // Navigate to home page
          window.location.reload(); // Reload the page after navigating
        });
      } else if (payment === "visa") {
        Swal.fire({
          icon: "info",
          title: selectedLanguage === "ar" ? "عذرًا!" : "Oops!",
          text:
            selectedLanguage === "ar"
              ? "سيتم تضمين هذا الخيار في الإصدار التالي."
              : "This option will be available in the next version.",
          confirmButtonText: selectedLanguage === "ar" ? "حسناً" : "OK",
        });
      } else if (payment === "credit") {
        console.log(coupon);
        /* const discountPercentage = toggle
        ? servesTotalQuantity
        : productTotalQuantity; */
        // const priceAfterDiscount = priceBeforeDiscount - discountAmount;

        // Calculate total price
        const priceBeforeDiscount = toggle
          ? servesGrandTotal
          : productGrandTotal;
        const TotalQuantity = toggle
          ? servesTotalQuantity
          : productTotalQuantity;
        const totalAfterDiscountCoupon =
          priceBeforeDiscount - ((coupon || 0) * TotalQuantity) / 100;
        const discountPercentage = User?.discount || 0;
        const discountAmount =
          totalAfterDiscountCoupon * (discountPercentage / 100);
        const totalPrice = totalAfterDiscountCoupon - discountAmount;

        // Check if user has sufficient wallet balance
        const userWallet = User?.Wallet || 0;

        if (userWallet < totalPrice) {
          toast.error(
            selectedLanguage === "ar"
              ? "رصيد المحفظة غير كافٍ."
              : "Insufficient wallet balance.",
            { autoClose: 3000 }
          );
          return;
        }

        // Show confirmation using Swal
        Swal.fire({
          title: selectedLanguage === "ar" ? "تأكيد الدفع" : "Confirm Payment",
          html: `
      <p>
        ${
          selectedLanguage === "ar"
            ? `إجمالي السعر بعد الخصم: <strong>${totalPrice.toFixed(
                2
              )}</strong> جنيه.<br/>نسبة الخصم: <strong>${discountPercentage}%</strong>`
            : `Total Price After Discount: <strong>${totalPrice.toFixed(
                2
              )}</strong> EGP.<br/>Discount Percentage: <strong>${discountPercentage}%</strong>`
        }
      </p>
      <p>${
        selectedLanguage === "ar"
          ? "هل أنت متأكد من متابعة الدفع باستخدام المحفظة؟"
          : "Are you sure you want to proceed with payment using your wallet?"
      }</p>
    `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText:
            selectedLanguage === "ar" ? "نعم، تأكيد" : "Yes, Confirm",
          cancelButtonText: selectedLanguage === "ar" ? "إلغاء" : "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            // Update wallet balance
            const updatedWallet = userWallet - totalPrice;

            // Save updated user data
            const updatedLoginData = {
              ...User,
              Wallet: updatedWallet,
            };

            localStorage.setItem(
              "loginFormData",
              JSON.stringify(updatedLoginData)
            );

            // Clear order details after successful payment
            const resetDetails = {
              discount_percentage: 0,
              price_before_discount: 0,
              price_after_discount: 0,
              grand_total: 0,
            };

            if (toggle) {
              saveServesDetails(resetDetails);
              localStorage.removeItem("servesOrder");
            } else {
              saveProductDetails(resetDetails);
              localStorage.removeItem("ProductOrder");
            }

            localStorage.removeItem("toggle");
            Swal.fire({
              icon: "success",
              title:
                selectedLanguage === "ar"
                  ? "تم الدفع بنجاح باستخدام المحفظة."
                  : "Payment was successful using your wallet.",
              confirmButtonText: selectedLanguage === "ar" ? "حسناً" : "OK",
            });

            // Reload the page
            navigate("/credits"); // Navigate to home page
            // window.location.reload();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: selectedLanguage === "ar" ? "خطأ!" : "Error!",
        text:
          selectedLanguage === "ar"
            ? "حدث خطأ أثناء الحجز."
            : "An error occurred during booking.",
        confirmButtonText: selectedLanguage === "ar" ? "حسناً" : "OK",
      });
    }
  };

  return (
    <div className="main_book py-lg-3 py-md-2 pb-5">
      {/* <ToastContainer position="top-right" autoClose={3000} theme="dark" /> */}

      <Container className="booking_container">
        <Row className="booking_row_main py-3">
          <Col xs={12} lg={7} md={7} sm={12} className="border main_col py-4">
            <div>
              <div className="payment">
                <Row className="justify-content-center mb-4">
                  <h4>{t("check_title")}</h4>
                  {["cash", "visa", "credit"].map((pay) => (
                    <Col key={pay} xs={4}>
                      <button
                        className={`btn btn_payment ${
                          payment === pay ? "active" : ""
                        }`}
                        onClick={() => handlePaymentChange(pay)}
                      >
                        {t(`${pay}_title`)}
                      </button>
                    </Col>
                  ))}
                </Row>
                <Row className="mx-3">
                  <h4>{t("check_code_title")}</h4>
                  <Col xs={6} lg={8}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("check_place_code")}
                      value={couponName}
                      onChange={(e) => setCouponName(e.target.value)}
                    />
                  </Col>
                  <Col xs={6} lg={4}>
                    <button onClick={applyCoupon} className="btn btn_coupon">
                      {t("add_code")}
                    </button>
                  </Col>
                </Row>
                <Row>
                  <div className="nots my-4">
                    <FaCircleExclamation className="icon" />
                    <p>
                      {t("add_card_massage")} <span>3bdoo</span>{" "}
                    </p>
                  </div>
                </Row>
              </div>
            </div>
            <div className="row">
              <button onClick={handleSubmit} className="btn btn_next">
                {t("check_btn")}
              </button>
            </div>
          </Col>
          <Col xs={11} lg={4} md={4} sm={11}>
            {toggle && toggle === true ? (
              <PriceSide
                priceBeforeDiscount={servesGrandTotal}
                discountPercentage={coupon}
                priceAfterDiscount={
                  servesGrandTotal - ((coupon || 0) * servesTotalQuantity) / 100
                }
                totalQuantity={servesTotalQuantity}
                Delivery_Cost={deliveryCost}
                Shipping_Cost={0}
              />
            ) : (
              <PriceSide
                priceBeforeDiscount={productGrandTotal}
                discountPercentage={coupon}
                priceAfterDiscount={
                  productGrandTotal -
                  ((coupon || 0) * productTotalQuantity) / 100
                }
                totalQuantity={productTotalQuantity}
                Delivery_Cost={deliveryCost}
                Shipping_Cost={shippingCost}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChickMain;
