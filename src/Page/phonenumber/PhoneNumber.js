import React from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { Col } from "react-bootstrap";
import { i18n } from "i18next";
import { useTranslation } from "react-i18next";

const PhoneNumber = ({ test, setTest }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="singup phone_login">
      <div className="container">
        <div className="row login_main mt-4">
          <Col xs={11} lg={6} md={10} sm={11} className="col-lg-5 col-md-8 ">
            <form className="row form g-3 mb-5 mt-3">
              <div className=" mb-3 row title">
                <Col xs={10} lg={10} md={10} sm={11}>
                  <h5 className=" ">{t("phone_title")}</h5>
                </Col>
                <Col xs={2} lg={2} md={2} sm={2}>
                  <IoMdExit
                    className=" exit_icon"
                    onClick={() => setTest(true)}
                  />
                </Col>
              </div>

              <div className="col-lg-12 row col-md-12 my-3">
                <div className="row justify-content-center">
                  <label className="mb-3">{t("phone_p")}</label>
                  <div className=" d-flex justify-content-center">
                    <select
                      className="form-select nationality"
                      aria-label="Default select example"
                    >
                      <option selected>Egy +20</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <input
                      type="number"
                      className="form-control phone"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={t("phone_placeholder")}

                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center submit_btn mt-4">
                <Link
                  type="submit"
                  className="btn mb-4 mx-2 btn-verify"
                  to="/verify"
                >
                  {t("phone_btn")}
                </Link>
              </div>
            </form>
          </Col>
        </div>
      </div>
    </div>
  );
};
export default PhoneNumber;
