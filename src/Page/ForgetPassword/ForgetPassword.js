import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useEmailContext } from '../../Context/EmailContext ';
import logo from '../../images/Logo.png'
const ForgetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { email, setEmailValue } = useEmailContext();
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setEmailValue(e.target.value);
    setErrors({
      ...errors,
      [e.target.name]: '', // Clear error message when input changes
    });
    setResponseMessage(''); // Clear response message when input changes
  };

  const validateForm = () => {
    let errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          'https://dashboard.knock-knock.ae/api/auth/forget-password',
          { email }
        );
        // Handle success response
        setResponseMessage(response.data.message);
        // setEmailValue('');
        if (
          response.status 
        ) {
          navigate('/reset_password');
        }
      } catch (error) {
        // Handle error response
        console.error('Error submitting form', error);
        setResponseMessage('An error occurred. Please try again.');
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
          <Col xs={11} lg={5} md={7} sm={11}>
            <form className="row form g-3 mb-5 mt-3" onSubmit={handleSubmit}>
              <div className="form_head text-center mb-3">
                <img className="" src={logo} alt="" />
                <h4>{t('forget_password')}</h4>
              </div>
              {responseMessage && (
                  <div className="error text-center">{responseMessage}</div>
                )}
              <div className="col-lg-12 row col-md-12 my-1">
                <div className="row forget_password justify-content-center">
                  <input
                    onChange={handleChange}
                    type="email"
                    className="form-control-verify"
                    name="email"
                    value={email}
                    placeholder={t('personal_email')}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="col-12 submit_btn mt-4">
                <button type="submit" className="btn mb-4 mx-2 btn-verify">
                  {t('forget_password_btn1')}
                </button>

              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgetPassword;
