import React from "react";
import { Container, Row } from "react-bootstrap";
import ScreenSlider from "./ScreenSlider";
import "./screen.css";
import { useTranslation } from "react-i18next";
const MainScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="screen">
      <h2 className="text-center">{t("Application_Screens")}</h2>
      <Container>
        <ScreenSlider />
      </Container>
    </div>
  );
};

export default MainScreen;
