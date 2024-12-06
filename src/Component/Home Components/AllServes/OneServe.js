import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ContextLang, ToggleLoginContext } from "../../../App";

const OneServe = ({ image, name_ar, link, name_en }) => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  const { toggleLogin, saveToggleLogin } = useContext(ToggleLoginContext);

  return (
    <Col xs={6} lg={3} md={3} sm={6} className="text-center">
      {toggleLogin === true ? (
        <Link to={link} className="serves_cards d-flex">
          <div className="card_img ">
            <img src={process.env.PUBLIC_URL + image} alt="" />
          </div>
          <div className="card_head">
            {selectedLanguage === "en" ? <p>{name_en}</p> : <p>{name_ar}</p>}
          </div>
        </Link>
      ) : (
        <div className="serves_cards d-flex">
          <div className="card_img ">
            <img src={image} alt="" />
          </div>
          <div className="card_head">
            {selectedLanguage === "en" ? <p>{name_en}</p> : <p>{name_ar}</p>}
          </div>
        </div>
      )}
      {/* <div className="servies_image">
        <Link to={link} className="link">
          <img src={image} alt="" />
          {selectedLanguage === "en" ? <p>{name_en}</p> : <p>{name_ar}</p>}
        </Link>
      </div> */}
    </Col>
  );
};

export default OneServe;
