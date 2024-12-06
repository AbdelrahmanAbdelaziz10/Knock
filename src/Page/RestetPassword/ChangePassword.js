import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import logo from "../../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEmailContext } from "../../Context/EmailContext ";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { email } = useEmailContext();

  const [forgetData, setForgetData] = useState({
    password: "",
    password_confirmation:"",
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setForgetData({
      ...forgetData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error message when input changes
    });
    setResponseMessage(""); // Clear response message when input changes
  };

  const validateForm = () => {
    let errors = {};
    if (!forgetData.password.trim()) {
      errors.password = "Email is required";
    }
    if (!forgetData.password_confirmation.trim()) {
        errors.password_confirmation = "Email is required";
      }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://dashboard.knock-knock.ae/api/auth/change-password",
          {
            email: email,
            password: forgetData.password,
            password_confirmation: forgetData.password_confirmation,
          }
        );
        // Handle success response
        setResponseMessage(response.data.message);
        setForgetData({
          password: "",
          password_confirmation: "",

        });
        if (response.message !== "يجب أن يتطابق تأكيد كلمة المرور مع كلمة المرور.") {
          navigate("/login");
        }
      } catch (error) {
        // Handle error response
        console.error("Error submitting form", error);
        setResponseMessage("An error occurred. Please try again.");
      }
    }
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <div className="login Verify">
      <div className="container">
        <Row className=" login_main mt-4">
          <Col xs={11} lg={5} md={7} sm={11}>
            <form className="row form g-3 mb-5 mt-3" onSubmit={handleSubmit}>
              <div className="form_head text-center mb-3">
                <img className="" src={logo} alt="" />
                <h4>{t("Change_password")}</h4>
              </div>
              {responseMessage && (
                  <div className="error">{responseMessage}</div>
                )}
              <div className="col-lg-12 row col-md-12 my-1">
                <div className="row forget_password justify-content-center">
                  <input
                    onChange={handleChange}
                    type="password"
                    className="form-control-verify mb-4"
                    name="password"
                    placeholder={t("personal_password_placeholder")}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                  <input
                    onChange={handleChange}
                    type="password"
                    className="form-control-verify"
                    name="password_confirmation"
                    placeholder={t("personal_Confirmpassword_placeholder")}
                  />
                  {errors.password_confirmation && (
                    <div className="text-danger">{errors.password_confirmation}</div>
                  )}
                </div>
              </div>

              <div className="col-12 submit_btn mt-4">
                <button type="submit" className="btn mb-4 mx-2 btn-verify">
                  {t("Change_password")}
                </button>

              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChangePassword;
