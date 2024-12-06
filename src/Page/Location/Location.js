import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ContextLang,
  ProductDetailsContext,
  ServesDetailsContext,
  ToggleContext,
} from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductDeteils from "./../ProductDeteils";
import NavBar from "../../Component/Common Component/NavBar/NavBar";
import Footer from "../../Component/Common Component/Footer/Footer";

const MapWithMarker = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  const { servesDetails, saveServesDetails } = useContext(ServesDetailsContext);
  const { productDetails, saveProductDetails } = useContext(
    ProductDetailsContext
  );

  // const { toggle, saveToggle } = useContext(ToggleContext);
  const toggle = JSON.parse(localStorage.getItem("toggle"));

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleAddAddress = () => {
    if (toggle) {
      if (markerPosition) {
        saveServesDetails({
          ...servesDetails,
          latitude: markerPosition.lat,
          longitude: markerPosition.lng,
        });
        navigate("/addaddress");
      }
    } else if (!toggle) {
      if (markerPosition) {
        saveProductDetails({
          ...productDetails,
          latitude: markerPosition.lat,
          longitude: markerPosition.lng,
        });
        navigate("/addaddress");
      }
    }
  };

  useEffect(() => {
    if (markerPosition) {
    }
  }, [markerPosition]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="location_page">
      <NavBar />
      <div className="main_address py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} lg={6} md={9} sm={12} className="">
              <Card className="address_card my-2">
                <div className="row d-flex">
                  <Col xs={1} lg={1} md={1} sm={1}>
                    <Link to="/">
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

                <div className="row justify-content-center">
                  <div className="search-location-input">
                    <LoadScript googleMapsApiKey="AIzaSyCqAeZ8WASm99pFDLG1t1QlHu0ocIZxh9I">
                      {mapCenter && (
                        <GoogleMap
                          center={mapCenter}
                          zoom={15}
                          mapContainerStyle={{ width: "100%", height: "400px" }}
                          onClick={handleMapClick}
                        >
                          {markerPosition && (
                            <Marker position={markerPosition} />
                          )}
                        </GoogleMap>
                      )}
                    </LoadScript>
                  </div>

                  <div className="col-10 mb-2 p-r"></div>
                  <div className="col-8 submit_btn mt-4">
                    <button
                      onClick={handleAddAddress}
                      className="btn mb-4 mx-4 sing_in"
                    >
                      {t("address_btn")}
                    </button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MapWithMarker;
