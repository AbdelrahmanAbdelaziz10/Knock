import React, { useContext, useEffect, useState } from "react";
import "../../Login/Login.css";
import { Alert, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Profile.css";
import { useTranslation } from "react-i18next";
import { FormDataContext } from "../../../App";

export const MainProfile = () => {
  const { t } = useTranslation();
  const loginFormData = JSON.parse(localStorage.getItem("loginFormData"));
  const { saveFormData } = useContext(FormDataContext);

  const [formData, setFormData] = useState({
    user_id: loginFormData.id,
    first_name: loginFormData.first_name,
    last_name: loginFormData.last_name,
    email: loginFormData.email,
    phone: loginFormData.phone,
    image: loginFormData.image,
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error message when input changes
    });
    setResponseMessage(""); // Clear response message when input changes
  };

  const validationProfileForm = () => {
    let errors = {};
    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationProfileForm()) {
      // Retrieve users from local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      // Find and update the user's data
      const updatedUsers = users.map((user) =>
        user.id === loginFormData.id
          ? { ...user, ...formData, password: formData.password } // Merge new data
          : user
      );

      // Save updated users to local storage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Save updated user data in the context and local storage
      saveFormData(formData);
      localStorage.setItem("loginFormData", JSON.stringify(formData));

      setResponseMessage("Profile updated successfully!");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile">
      <div className="singup profile">
        <div className="container">
          <div className="row login_main">
            <Col xs={12} lg={5} md={8} sm={12}>
              <form className="row form" onSubmit={handleSubmit}>
                <div className="form_head text-center">
                  <h4>{t("profile")} </h4>
                  <img
                    className=""
                    src={loginFormData.image || ""}
                    alt="User Avatar"
                  />
                </div>
                <div className="col-lg-12 col-md-12 my-lg-2 my-md-2 row media">
                  {responseMessage && (
                    <Alert variant="success" className="text-center">
                      {responseMessage}
                    </Alert>
                  )}
                  <div className="col-lg-6 col-md-6 pl1">
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                    {errors.first_name && (
                      <Alert variant="danger">{errors.first_name}</Alert>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 pl2">
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {errors.last_name && (
                      <Alert variant="danger">{errors.last_name}</Alert>
                    )}
                  </div>
                </div>
                <div className="col-md-12 mb-3 p-r">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <Alert variant="danger">{errors.email}</Alert>
                  )}
                </div>
                <div className="col-md-12 mb-3 p-r">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <Alert variant="danger">{errors.password}</Alert>
                  )}
                </div>
                <div className="col-md-12 mb-3 p-r">
                  <input
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  {errors.password_confirmation && (
                    <Alert variant="danger">
                      {errors.password_confirmation}
                    </Alert>
                  )}
                </div>
                <div className="mb-lg-2 mb-md-3 d-flex">
                  <input
                    type="number"
                    className="form-control phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  {errors.phone && (
                    <Alert variant="danger">{errors.phone}</Alert>
                  )}
                </div>
                <div className="col-12 submit_btn mt-4">
                  <button type="submit" className="btn mb-4 mx-4 sing_in">
                    {t("personal_btn")}
                  </button>
                </div>
              </form>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};
