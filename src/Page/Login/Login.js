import React, { useContext, useEffect, useState } from "react";
import logo from "../../images/Logo.png";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ContextLang,
  LoginFormDataContext,
  ToggleLoginContext,
} from "../../App";
import Swal from "sweetalert2"; // Import SweetAlert2
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { saveLoginFormData } = useContext(LoginFormDataContext);
  const { toggleLogin, saveToggleLogin } = useContext(ToggleLoginContext);
  const { selectedLanguage } = useContext(ContextLang);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
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
    const isArabic = selectedLanguage === "ar";

    if (!loginData.email.trim()) {
      errors.email = isArabic ? "البريد الإلكتروني مطلوب" : "Email is required";
    }

    if (!loginData.password.trim()) {
      errors.password = isArabic
        ? "كلمة المرور مطلوبة"
        : "Password is required";
    } else if (loginData.password.trim().length < 6) {
      errors.password = isArabic
        ? "يجب أن تكون كلمة المرور 6 أحرف على الأقل"
        : "Password must be at least 6 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Fetch users from local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user exists
      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        saveLoginFormData(user); // Save user data to context
        saveToggleLogin(true); // Update login status in context

        setTimeout(() => {
          navigate("/", {
            state: {
              successMessage:
                selectedLanguage === "ar"
                  ? "تم تسجيل الدخول بنجاح"
                  : "You have successfully logged in.",
            },
          });
        }, 0); // Delay navigation by 1.5 seconds
      } else {
        setResponseMessage(
          selectedLanguage === "ar"
            ? "لديك خطأ في البريد الإلكتروني أو كلمة المرور التي أدخلتها."
            : "You have error in the email or password you entered."
        );
      }

      // Clear login data
      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )} */}
      <div className="container">
        <div className="row login_main">
          <Col xs={10} lg={5} md={8} sm={10}>
            <form className="row form g-3 mb-5" onSubmit={handleSubmit}>
              <i className="fa-solid fa-x"></i>
              <div className="form_head text-center mb-2">
                <img className="" src={logo} alt="" />
                <h4>{t("login")}</h4>
              </div>
              {responseMessage && (
                <div className="error text-center">{responseMessage}</div>
              )}
              <div className="col-lg-12 col-md-12 my-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder={t("personal_email_placeholder")}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="col-md-12 p-r">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder={t("personal_password_placeholder")}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>

              <div className="row check justify-content-between mt-4">
                <div className="mb-3 col-6 form-check">
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    {t("login_check")}
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                </div>
                <div className="col-6 forget ps-lg-5 ps-md-4">
                  <Link
                    to="/forget_password"
                    className="forget_password ms-lg-2"
                  >
                    {t("login_forget")}
                  </Link>
                </div>
              </div>

              <div className="col-12 submit_btn mt-4">
                <button type="submit" className="btn mb-4 mx-4 sing_in">
                  {t("login")}
                </button>
                <p>
                  {t("login_p")}{" "}
                  <Link to="/singup" className="link_singup">
                    {t("singup")}
                  </Link>
                </p>
              </div>
            </form>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useContext, useState, useEffect } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebaseConfig"; // Firebase auth and Firestore instance
// import { Link, useNavigate } from "react-router-dom";
// import { LoginFormDataContext, ToggleLoginContext } from "../../App";
// import { useTranslation } from "react-i18next";
// import { Col } from "react-bootstrap";
// import logo from "../../images/Logo.png";

// const Login = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { saveLoginFormData } = useContext(LoginFormDataContext);
//   const { saveToggleLogin } = useContext(ToggleLoginContext);

//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//     setResponseMessage("");
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!loginData.email.trim()) errors.email = "Email is required";
//     if (!loginData.password.trim()) errors.password = "Password is required";
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handelSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           loginData.email,
//           loginData.password
//         );
//         const user = userCredential.user;

//         // Save user data in context
//         saveLoginFormData(user);
//         saveToggleLogin(true);
//         navigate("/");
//       } catch (error) {
//         setResponseMessage("Invalid email or password.");
//       }
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <div className="login">
//       <div className="container">
//         <div className="row login_main">
//           <Col xs={10} lg={5} md={8} sm={10}>
//             <form className="row form g-3 mb-5" onSubmit={handelSubmit}>
//               <i className="fa-solid fa-x"></i>
//               <div className="form_head text-center mb-2">
//                 <img className="" src={logo} alt="" />
//                 <h4>{t("login")} </h4>
//               </div>
//               {responseMessage && (
//                 <div className="error text-center">{responseMessage}</div>
//               )}
//               <div className="col-lg-12 col-md-12 my-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   value={loginData.email}
//                   onChange={handleChange}
//                   placeholder={t("personal_email_placeholder")}
//                 />
//                 {errors.email && <div className="error">{errors.email}</div>}
//               </div>

//               <div className="col-md-12 p-r">
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={loginData.password}
//                   onChange={handleChange}
//                   placeholder={t("personal_password_placeholder")}
//                 />
//                 {errors.password && (
//                   <div className="error">{errors.password}</div>
//                 )}
//               </div>

//               <div className="row check justify-content-between  mt-4 ">
//                 <div className="mb-3 col-6 form-check">
//                   <label className="form-check-label" for="exampleCheck1">
//                     {t("login_check")}
//                   </label>
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="exampleCheck1"
//                   />
//                 </div>
//                 <div className="col-6 forget ps-lg-5 ps-md-4">
//                   <Link
//                     to="/forget_password"
//                     className="forget_password ms-lg-2"
//                   >
//                     {t("login_forget")}
//                   </Link>
//                 </div>
//               </div>

//               <div className="col-12 submit_btn mt-4">
//                 <button type="submit" className="btn mb-4 mx-4 sing_in">
//                   {t("login")}
//                 </button>
//                 <p>
//                   {t("login_p")}{" "}
//                   <Link to="/singup" className="link_singup">
//                     {t("singup")}
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </Col>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
