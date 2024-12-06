import React, { useContext, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  ContextLang,
  ProductDetailsContext,
  ServesDetailsContext,
  ToggleContext,
} from "../../../App";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const MainAddressPage = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  const { servesDetails, saveServesDetails } = useContext(ServesDetailsContext);
  const { productDetails, saveProductDetails } = useContext(
    ProductDetailsContext
  );
  const toggle = JSON.parse(localStorage.getItem("toggle"));

  const navigate = useNavigate();

  const [addressInfo, setAddressInfo] = useState({
    address: "",
    building_number: "",
    flat_number: "",
    city: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error message when input changes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (toggle) {
        saveServesDetails({
          ...servesDetails,
          ...addressInfo,
        });
        // const servesOrder = JSON.parse(localStorage.getItem('servesOrder')) || {};
        // localStorage.setItem('servesOrder', JSON.stringify({ ...servesOrder, ...addressInfo}));
      } else {
        saveProductDetails({
          ...productDetails,
          ...addressInfo,
        });
        // const ProductOrder = JSON.parse(localStorage.getItem('ProductOrder')) || {};
        // localStorage.setItem('ProductOrder', JSON.stringify({ ...ProductOrder, ...addressInfo}));
      }

      navigate("/checkout");
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!addressInfo.address.trim()) {
      errors.address = t("Address is required");
    }
    if (!addressInfo.building_number.trim()) {
      errors.building_number = t("Building number is required");
    }
    if (!addressInfo.flat_number.trim()) {
      errors.flat_number = t("Flat number is required");
    }
    if (!addressInfo.city.trim()) {
      errors.city = t("City is required");
    }
    if (!addressInfo.country.trim()) {
      errors.country = t("Country is required");
    }
    return errors;
  };

  return (
    <div className="main_address py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={6} md={9} sm={12} className="">
            <Card className="address_card my-2">
              <div className="row d-flex">
                <Col xs={1} lg={1} md={1} sm={1}>
                  <Link to="/location">
                    {selectedLanguage === "ar" ? (
                      <FaArrowRight className=" arrow_icon arrow_icon_ar" />
                    ) : (
                      <FaArrowLeft className="arrow_icon arrow_icon_en" />
                    )}
                  </Link>
                </Col>
                <Col xs={10} lg={10} md={10} sm={10} className="">
                  <h4 className="text-center">{t("address_title")}</h4>
                </Col>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                  <div className="col-10 mb-2 p-r">
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      name="address"
                      placeholder={t("Address")}
                      value={addressInfo.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <div className="error">{errors.address}</div>
                    )}
                  </div>
                  {/* Other input fields */}
                  <div className="col-10 mb-2 p-r">
                    <input
                      type="number"
                      className="form-control"
                      id="inputAddress"
                      name="building_number"
                      placeholder={t("Building_No.")}
                      value={addressInfo.building_number}
                      onChange={handleChange}
                    />
                    {errors.building_number && (
                      <div className="error">{errors.building_number}</div>
                    )}
                  </div>
                  <div className="col-10 mb-2 p-r">
                    <input
                      type="number"
                      className="form-control"
                      id="inputAddress"
                      name="flat_number"
                      placeholder={t("Flat_No.")}
                      value={addressInfo.flat_number}
                      onChange={handleChange}
                    />
                    {errors.flat_number && (
                      <div className="error">{errors.flat_number}</div>
                    )}
                  </div>
                  <div className="col-10 mb-2 p-r">
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      name="city"
                      placeholder={t("city")}
                      value={addressInfo.city}
                      onChange={handleChange}
                    />
                    {errors.city && <div className="error">{errors.city}</div>}
                  </div>
                  <div className="col-10 mb-2 p-r">
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      name="country"
                      placeholder={t("country")}
                      value={addressInfo.country}
                      onChange={handleChange}
                    />
                    {errors.country && (
                      <div className="error">{errors.country}</div>
                    )}
                  </div>
                  <div className="col-8 submit_btn mt-4">
                    <button type="submit" className="btn mb-4 mx-4 sing_in">
                      {t("address_btn")}
                    </button>
                  </div>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainAddressPage;
