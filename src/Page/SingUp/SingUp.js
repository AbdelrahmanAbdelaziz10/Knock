import React, { useState, useEffect, useContext } from "react";
import "../Login/Login.css";
import logo from "../../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ContextLang } from "../../App";

export const SingUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    image: null,
    Wallet: 0.0,
    discount: 0,
  });
  const { selectedLanguage } = useContext(ContextLang);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let errors = {};
    const isArabic = selectedLanguage === "ar";
    if (!formData.first_name.trim()) {
      errors.first_name = isArabic
        ? "الاسم الاول مطلوبة"
        : "First Name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = isArabic
        ? "الاسم الاخير مطلوبة"
        : "Last Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = isArabic ? "البريد الالكتروني مطلوب" : "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = isArabic ? "البريد الالكتروني غير صحيح" : "Invalid email";
    }
    if (!formData.phone.trim()) {
      errors.phone = isArabic ? " رقم الهاتف مطلوب" : "Phone required";
    }
    if (!formData.password.trim()) {
      errors.password = isArabic
        ? "كلمة المرور مطلوبة"
        : "Password is required";
    }
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = isArabic
        ? "كلمة المرور ليست متطابقة "
        : "Passwords do not match";
    }
    if (!formData.image) {
      errors.image = isArabic ? " الصورة مطلوبة" : "Image is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Retrieve existing users
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the email already exists
        const isEmailTaken = existingUsers.some(
          (user) => user.email === formData.email
        );

        if (isEmailTaken) {
          setErrors({
            ...errors,
            email:
              selectedLanguage === "ar"
                ? "البريد الالكتروني مستخدم بالفعل"
                : "This email is already registered.",
          });
          setIsSubmitting(false);
          return;
        }

        // Determine the next user ID
        const nextId =
          existingUsers.length > 0
            ? Math.max(...existingUsers.map((user) => user.id)) + 1
            : 1;

        // Convert image to Base64 for storage
        const reader = new FileReader();
        reader.onloadend = () => {
          const newUser = {
            ...formData,
            id: nextId, // Assign the new user ID
            image: reader.result, // Store the Base64 image
          };

          // Save the new user to localStorage
          localStorage.setItem(
            "users",
            JSON.stringify([...existingUsers, newUser])
          );

          // Navigate to the login page with success message
          navigate("/login", {
            state: {
              successMessage:
                selectedLanguage === "ar"
                  ? "تم انشاء حساب جديد بنجاح."
                  : "New account created successfully.",
            },
          });
        };

        if (formData.image) {
          reader.readAsDataURL(formData.image);
        }
      } catch (error) {
        console.error("Error saving user data:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login singup">
      <div className="container">
        <div className="row login_main mt-4">
          <Col xs={12} lg={5} md={8} sm={12}>
            <form className="row form g-3 mt-3" onSubmit={handleSubmit}>
              <i className="fa-solid fa-x"></i>
              <div className="form_head text-center mb-3">
                <img className="" src={logo} alt="" />
                <h4>{t("singup")}</h4>
              </div>
              {/* {responseMessage && (
                <div className="error text-center">{responseMessage}</div>
              )} */}
              <div className="col-lg-12 col-md-12 my-lg-2 my-md-2 row media">
                <div className="col-lg-6 col-md-6 pl1">
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder={t("personal_fname_placeholder")}
                  />
                  {errors.first_name && (
                    <div className="error">{errors.first_name}</div>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 pl2">
                  <input
                    type="text"
                    className="form-control"
                    value={formData.last_name}
                    onChange={handleChange}
                    name="last_name"
                    placeholder={t("personal_lname_placeholder")}
                  />
                  {errors.last_name && (
                    <div className="error">{errors.last_name}</div>
                  )}
                </div>
              </div>
              <div className="col-md-12 mb-2 p-r">
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  placeholder={t("personal_email")}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="mb-lg-2 mb-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder={t("personal_phone_placeholder")}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>
              <div className="col-md-12 mb-2 p-r">
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  placeholder={t("personal_password_placeholder")}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="col-md-12 mb-2 p-r">
                <input
                  type="password"
                  className="form-control"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  name="password_confirmation"
                  placeholder={t("personal_Confirmpassword_placeholder")}
                />
                {errors.password_confirmation && (
                  <div className="error">{errors.password_confirmation}</div>
                )}
              </div>
              <div className="col-md-12">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {errors.image && <div className="error">{errors.image}</div>}
              </div>
              {imagePreview && (
                <div className="col-md-12 text-center mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100px", borderRadius: "50%" }}
                  />
                </div>
              )}

              <div className="col-12 submit_btn mt-4">
                <button
                  type="submit"
                  className="btn mb-4 mx-4 sing_in"
                  disabled={isSubmitting}
                >
                  {t("singup")}
                </button>
                <p>
                  {t("singup_p")}
                  <Link to="/login" className="link_singup">
                    {t("login")}
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

export default SingUp;

// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebaseConfig"; // Firebase auth and Firestore instance
// import { doc, setDoc } from "firebase/firestore"; // Firestore methods
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { Col } from "react-bootstrap";
// import logo from "../../images/Logo.png";

// // Reusable InputField Component
// const InputField = ({ type, name, value, onChange, placeholder, error }) => (
//   <div className="mb-3">
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`form-control ${error ? "is-invalid" : ""}`}
//       placeholder={placeholder}
//     />
//     {error && <div className="invalid-feedback">{error}</div>}
//   </div>
// );

// const SignUp = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     password_confirmation: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//     setResponseMessage("");
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.first_name.trim())
//       errors.first_name = t("error_first_name_required");
//     if (!formData.last_name.trim())
//       errors.last_name = t("error_last_name_required");
//     if (!formData.email.trim()) errors.email = t("error_email_required");
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       errors.email = t("error_invalid_email");
//     if (!formData.password.trim())
//       errors.password = t("error_password_required");
//     if (formData.password !== formData.password_confirmation)
//       errors.password_confirmation = t("error_passwords_mismatch");

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         // Create user account with Firebase Auth
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           formData.email,
//           formData.password
//         );
//         const user = userCredential.user;

//         // Save user data to Firestore
//         const userData = {
//           first_name: formData.first_name,
//           last_name: formData.last_name,
//           email: formData.email,
//           phone: formData.phone,
//           created_at: new Date().toISOString(),
//         };

//         await setDoc(doc(db, "users", user.uid), userData);

//         setResponseMessage(t("account_created_successfully"));
//         navigate("/login");
//       } catch (error) {
//         setResponseMessage(t("error_creating_account"));
//         console.error("Error saving user data:", error);
//       }
//     }
//   };

//   return (
//     <div className="login signup">
//       <div className="container">
//         <div className="row login_main mt-4">
//           <Col xs={10} lg={5} md={8} sm={10}>
//             <form className="row form g-3 mt-3" onSubmit={handleSubmit}>
//               <div className="form_head text-center mb-3">
//                 <img src={logo} alt="Logo" className="mt-3" />
//                 <h4>{t("signup")}</h4>
//               </div>
//               {responseMessage && (
//                 <div className="text-center alert alert-info">
//                   {responseMessage}
//                 </div>
//               )}

//               <div className="col-lg-12 col-md-12 row">
//                 <div className="col-lg-6 col-md-6">
//                   <InputField
//                     type="text"
//                     name="first_name"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                     placeholder={t("personal_fname_placeholder")}
//                     error={errors.first_name}
//                   />
//                 </div>
//                 <div className="col-lg-6 col-md-6">
//                   <InputField
//                     type="text"
//                     name="last_name"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                     placeholder={t("personal_lname_placeholder")}
//                     error={errors.last_name}
//                   />
//                 </div>
//               </div>

//               <InputField
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder={t("personal_email")}
//                 error={errors.email}
//               />

//               <InputField
//                 type="number"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder={t("personal_phone_placeholder")}
//                 error={errors.phone}
//               />

//               <InputField
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder={t("personal_password_placeholder")}
//                 error={errors.password}
//               />

//               <InputField
//                 type="password"
//                 name="password_confirmation"
//                 value={formData.password_confirmation}
//                 onChange={handleChange}
//                 placeholder={t("personal_Confirmpassword_placeholder")}
//                 error={errors.password_confirmation}
//               />

//               <div className="col-12 text-center submit_btn">
//                 <button type="submit" className="btn mb-4 mx-4 sing_in">
//                   {t("signup")}
//                 </button>
//                 <p className="mt-3">
//                   {t("signup_p")}
//                   <Link to="/login" className="ms-2 link_signup">
//                     {t("login")}
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

// export default SignUp;
