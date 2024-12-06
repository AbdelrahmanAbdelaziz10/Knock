import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./creditswiper.css";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { ContextLang, LoginFormDataContext } from "../../../../App";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify"; // Import toast

export default function CreditSwiper() {
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(ContextLang);
  const loginFormDatalocal =
    JSON.parse(localStorage.getItem("loginFormData")) || {};
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const { data } = useFetch("/data.json");
  const gitPacge = data?.package;
  const navigate = useNavigate();
  const { saveLoginFormData } = useContext(LoginFormDataContext);

  const handleSubmit = (packageId, packagePlace, discount) => {
    Swal.fire({
      title:
        selectedLanguage === "ar"
          ? "هل تريد شراء هذه الباقة؟"
          : "Do you want to buy this package?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        selectedLanguage === "ar" ? "نعم، اشتريها!" : "Yes, Buy it!",
      cancelButtonText: selectedLanguage === "ar" ? "إلغاء" : "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Calculate updated wallet balance by adding the package coins to the existing balance
        const updatedWallet = (loginFormDatalocal?.Wallet || 0) + packagePlace;
        const discountWallet = discount || 0;

        // Update loginFormDatalocal with the new Wallet balance
        const updatedLoginData = {
          ...loginFormDatalocal,
          Wallet: updatedWallet,
          discount: discountWallet,
        };

        // Save updated login data back to localStorage
        localStorage.setItem("loginFormData", JSON.stringify(updatedLoginData));

        // Update the matching user's wallet in the users array
        const updatedUsers = users.map((user) =>
          user.email === loginFormDatalocal?.email
            ? { ...user, Wallet: updatedWallet }
            : user
        );

        // Save the updated users array back to localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Update the context with the latest login data
        saveLoginFormData(updatedLoginData);

        // Show success message using Swal
        Swal.fire({
          title:
            selectedLanguage === "ar"
              ? `تمت عملية الشراء بنجاح! رصيد المحفظة الجديد: ${updatedWallet}`
              : `Purchase successful! New Wallet Balance: ${updatedWallet}`,
          icon: "success",
          confirmButtonText: selectedLanguage === "ar" ? "موافق" : "OK",
        });

        // Delay navigation for 10 seconds and then redirect to the /credits page
        navigate("/credits");
      }
    });
  };

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {gitPacge?.length > 0 ? (
          gitPacge.map((pacage) => (
            <SwiperSlide key={pacage.id}>
              <h5 className="mb-4">
                {selectedLanguage === "en" ? pacage.name_en : pacage.name_ar}
              </h5>
              {/* <p className="descend mb-4">
                {t("price")} {pacage.price_before_discount}
              </p> */}
              <h4 className="mb-3">
                {t("price")} {pacage.price_before_discount}
              </h4>
              <h6 className="mb-2">
                {selectedLanguage === "ar"
                  ? "كاش باك بقيمة "
                  : "Cashback worth"}{" "}
                {pacage?.discount} %
              </h6>
              <p>
                {selectedLanguage === "en" ? pacage.notes_en : pacage.notes_ar}
              </p>
              <p>
                {t("expire_date")} {pacage.expire_date}
              </p>
              <button
                className="btn btn_next"
                onClick={() =>
                  handleSubmit(
                    pacage.id,
                    pacage.price_before_discount,
                    pacage.discount
                  )
                }
              >
                {selectedLanguage === "ar" ? "اشترِ الباقة" : "Buy Package"}
              </button>
            </SwiperSlide>
          ))
        ) : (
          <h4 style={{ marginTop: "-2rem" }}>
            {selectedLanguage === "ar" ? "لا يوجد رصيد" : "No Balance"}
          </h4>
        )}
      </Swiper>
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />
    </>
  );
}
