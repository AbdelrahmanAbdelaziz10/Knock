import React, { useEffect } from "react";
import NavBar from "../../Component/Common Component/NavBar/NavBar";
import Footer from "../../Component/Common Component/Footer/Footer";
import "./Profile.css";
import { MainProfile } from "./Main Profile/MainProfile";
const ProfilePage = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className="profile_page">
      <NavBar />
      <MainProfile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
