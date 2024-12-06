import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ContextLang, ToggleLoginContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Component/Common Component/Footer/Footer";
import DownloadApp from "../Component/Home Components/DownloadApp/DownloadApp";
import Sponsor from "../Component/Home Components/Sponsor/Sponsor";
import WhyUs from "../Component/Home Components/Why Us/WhyUs";
import AllServes from "../Component/Home Components/AllServes/AllServes";
import HeaderHome from "../Component/Home Components/Header/HeaderHome";
import { Serves } from "../Component/Home Components/Serves/Serves";
import AboutSay from "../Component/Home Components/About Say/AboutSay";
import NavBar from "../Component/Common Component/NavBar/NavBar";
import { toast, ToastContainer } from "react-toastify";

const HomePageLogin = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  const { toggleLogin } = useContext(ToggleLoginContext) || {}; // Safe access to context
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const toggleLogin = JSON.parse(localStorage.getItem("toggleLogin"));

    if (location.state?.successMessage && toggleLogin) {
      // Show toast message
      toast.success(location.state.successMessage);

      // Clear the state to prevent showing the message again
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homepage">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <NavBar />
      <HeaderHome />
      <Serves />
      <WhyUs />
      <Sponsor />
      <AboutSay />
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default HomePageLogin;
