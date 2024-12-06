import React, { useContext, useEffect, useState } from "react";
import "../Login/Login.css";
import logo from "../../images/Logo.png";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEmailContext } from "../../Context/EmailContext ";
import { FormDataContext } from "../../App";

const Verify = () => {
  const { t } = useTranslation();
  // const { email } = useEmailContext();
  const { saveFormData ,formData } = useContext(FormDataContext);
  const [email,setEmail]=useState(formData.email);
  const [code, setCode] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setCode(value);
    setResponseMessage(""); // Clear response message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dashboard.knock-knock.ae/api/auth/account_verification",
        { email, code }
      );
      // Handle success response
      setResponseMessage(response.data.message);
      setCode("");
      if (response.data.status) {
        navigate("/login");
      }
    } catch (error) {
      // Handle error response
      console.error("Error submitting form", error);
      if (error.response && error.response.data && error.response.data.message) {
        setResponseMessage(error.response.data.message);
      } else {
        setResponseMessage("An error occurred. Please try again.");
      }
    }
  };
  
  const handleSubmitResent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dashboard.knock-knock.ae/api/auth/resend-code",
        { email }
      );
      // Handle success response
      setResponseMessage(response.data.message);
      setCode("");
    } catch (error) {
      // Handle error response
      console.error("Error submitting form", error);
      if (error.response && error.response.data && error.response.data.message) {
        setResponseMessage(error.response.data.message);
      } else {
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
          <Col xs={11} lg={5} md={7} sm={11} className="">
            <form className="row form g-3 mb-5 mt-3" >
              <div className="form_head text-center mb-3">
                <img className="" src={logo} alt="" />
                <h4>{t("verify_title")}</h4>
              </div>
              {responseMessage === "account is incorrect !" || responseMessage==="The given data was invalid." && (
                  <div className="error text-center">{responseMessage}</div>
                )}

              <div className="col-lg-12 row col-md-12 my-3">
                <div className="row justify-content-center">
                  <input
                    type="number"
                    className="form-control-verify col-9"
                    name="code"
                    value={code}
                    placeholder="5   5   5   5"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 submit_btn mt-4">
              <button type="submit" onClick={handleSubmitResent} className="btn mb-4 mx-2 send_again">
                  {t("verify_btn1")}
                </button>
                <button type="submit" onClick={handleSubmit} className="btn mb-4 mx-2 btn-verify">
                  {t("verify_btn2")}
                </button>


                {/* {responseMessage === "account is incorrect !" && responseMessage==="The given data was invalid." && (
                  <div className="success">{responseMessage}</div>
                )} */}
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Verify;
