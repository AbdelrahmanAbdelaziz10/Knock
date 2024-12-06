import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import logo from "../../images/Logo.png";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEmailContext } from "../../Context/EmailContext ";

const RestPassword = () => {
  const { t } = useTranslation();
  const { email } = useEmailContext();

  const [otp, setOtp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setOtp(value);
    setResponseMessage(""); // Clear response message when input changes
    setError(""); // Clear error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    try {
      const response = await axios.post(
        "https://dashboard.knock-knock.ae/api/auth/reset-password",
        { email, otp }
      );
      // Handle success response
      setResponseMessage(response.data.message);
      setOtp("");
      if (response.data.status ) {
        navigate("/change_password");
      }
    } catch (error) {
      // Handle error response
      console.error("Error submitting form", error);
      if (error.response && error.response.data && error.response.data.message) {
        setResponseMessage("");
        setError(error.response.data.message);
      } else {
        setResponseMessage("");
        setError("An error occurred. Please try again.");
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
          <Col xs={11} lg={5} md={7} sm={11} className="">
            <form className="row form g-3 mb-5 mt-3" onSubmit={handleSubmit}>
              <div className="form_head text-center mb-3">
                <img className="" src={logo} alt="" />
                <h4>{t("Reset_password")}</h4>
              </div>
              {error && <div className="error text-center">{error}</div>}
              {responseMessage && <div className="success text-center">{responseMessage}</div>}

              <div className="col-lg-12 row col-md-12 my-3">
                <div className="row justify-content-center">
                  <input
                    type="number"
                    className="form-control-verify col-6"
                    name="otp"
                    value={otp}
                    placeholder="5   5   5   5"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 submit_btn mt-4">
                <button type="submit" className="btn mb-4 mx-2 btn-verify">
                  {t("Reset_password")}
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RestPassword;
